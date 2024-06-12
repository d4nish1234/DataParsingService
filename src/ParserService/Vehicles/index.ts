var axios = require('axios');
var parseString = require('xml2js').parseString;
var { Vehicle } = require('../../graphql/Vehicle/index');
var { VehicleType } = require('../../graphql/VehicleType/index');
var IVehicleMake = require('./models');
const { Sequelize, DataTypes } = require('sequelize');
var { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType } = require('./transforms');

export const getAllVehicleMakesAndTypes = async () => {


    const getVehicleTypeAPI = async (makeId: string) => {
        console.log('reading make id...', makeId)
        try {
            var res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`);
            var out;
            parseString(res.data, (_: any, result: any) => {
                out = result;
            })
            return out

        } catch (error) {
            console.log("getVehicleTypeAPI ", error)
        }
    }

    const getMakesAPI = async () => {
        try {
            var out;
            var res = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML");
            parseString(res.data, (err: any, result: any) => {
                out = result;
            })
            return out;
        } catch (error) {
            console.log("getMakesAPI ", error)
        }
    }

    var rawVehiclesData = await getMakesAPI();

    // var rawVehiclesData = await getFewMakesData(); // TODO: replace with await getMakesAPI();
    var vehicleTransforms = transformGetVehicleMakesList(rawVehiclesData).map((vehicle: any) => {
        const vehicleMakeInfo: typeof IVehicleMake = transformGetMakeInfo(vehicle);
        return vehicleMakeInfo;
    });

    var transformedVehicles: typeof Vehicle[] = new Array<typeof Vehicle>();
    await Promise.all(vehicleTransforms.map(async (vehicle: any) => {
        // var vehicleTypeRaw = await getVehicleType(vehicle.Make_ID) // TEST 
        var vehicleTypeRaw = await getVehicleTypeAPI(vehicle.Make_ID) // LIVE
        var transformedVehicleTypes = transformGetVehicleTypes(vehicleTypeRaw)

        var vehicleTypes: typeof VehicleType[] = new Array<typeof VehicleType>();
        transformedVehicleTypes.forEach((vehicleType: any) => {
            var transformedVehicleType = transformGetVehicleType(vehicleType);
            var vehicleTypeDTO = new VehicleType(transformedVehicleType.VehicleTypeId, transformedVehicleType.VehicleTypeName);
            vehicleTypes.push(vehicleTypeDTO);
        });
        transformedVehicles.push(new Vehicle(vehicleTypes, Number(vehicle.Make_ID), vehicle.Make_Name))
    }))

    // persistence
    // should be in its own folder structure
    const sequelize = new Sequelize('sqlite::memory:');

    const ParsingOut = sequelize.define('parse_output', {
        data: DataTypes.TEXT,
        service: DataTypes.TEXT,
    });
    await sequelize.sync({ force: true });
    await ParsingOut.create({
        data: transformedVehicles.toString(),
        service: 'vehicles'
    });

    return transformedVehicles
}
