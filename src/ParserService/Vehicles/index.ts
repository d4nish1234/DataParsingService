var axios = require('axios');
var parseString = require('xml2js').parseString;
var { Vehicle } = require ('../../graphql/Vehicle/index');
var { VehicleType } = require ('../../graphql/VehicleType/index');
var IVehicleMake = require ('./models');
var { getFewMakesData, getVehicleType } = require ('../../../tests/ParserService/getTestData');
var { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType } = require ('./transforms');

export const getAllVehicleMakesAndTypes = async () => {

    const getVehicleTypeAPI = async (makeId: string) => {
        try {
            axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`).then((res: any) => {
                var parsedXML = parseString(res.data, (_: any, result: any) => {
                    return result;
                })
            });
        } catch (error) {
            console.log("getVehicleTypeAPI ", error)
        }
    }

    const getMakesAPI = async () => {
        try {
            var res = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML");
            parseString(res.data, (err: any, result: any) => {
                return result;
            })
        } catch (error) {
            console.log("getMakesAPI ", error)
        }
    }

    var rawVehiclesData = await getFewMakesData(); // TODO: replace with await getMakesAPI();
    var vehicleTransforms = transformGetVehicleMakesList(rawVehiclesData).map((vehicle: any) => {
        const vehicleMakeInfo: typeof IVehicleMake = transformGetMakeInfo(vehicle);
        return vehicleMakeInfo;
    });

    var transformedVehicles: typeof Vehicle[] = new Array<typeof Vehicle>();
    await Promise.all(vehicleTransforms.map(async (vehicle: any) => {
        var vehicleTypeRaw = await getVehicleType(vehicle.Make_ID) // TODO: replace with await getVehicleTypeAPI(vehicle.Make_ID)
        var transformedVehicleTypes = transformGetVehicleTypes(vehicleTypeRaw)

        var vehicleTypes: typeof VehicleType[] = new Array<typeof VehicleType>();
        transformedVehicleTypes.forEach((vehicleType: any) => {
            var transformedVehicleType = transformGetVehicleType(vehicleType);
            var vehicleTypeDTO = new VehicleType(transformedVehicleType.VehicleTypeId, transformedVehicleType.VehicleTypeName);
            vehicleTypes.push(vehicleTypeDTO);
        });
        transformedVehicles.push(new Vehicle(vehicleTypes, Number(vehicle.Make_ID), vehicle.Make_Name))
    }))

    console.log(transformedVehicles)

    return transformedVehicles
}
