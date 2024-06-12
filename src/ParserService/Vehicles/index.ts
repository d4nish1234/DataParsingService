import axios from 'axios';
var parseString = require('xml2js').parseString;
import { Vehicle } from '../../graphql/Vehicle/index';
import { VehicleType } from '../../graphql/VehicleType/index';
import { IVehicleMake } from './models';
import { getFewMakesData, getVehicleType } from '../../../tests/ParserService/getTestData';
import { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType } from './transforms';

export const getAllVehicleMakesAndTypes = async () => {

    const getVehicleTypeAPI = async (makeId: string) => {
        try {
            axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`).then((res) => {
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
    var vehicleTransforms = transformGetVehicleMakesList(rawVehiclesData).map(vehicle => {
        const vehicleMakeInfo: IVehicleMake = transformGetMakeInfo(vehicle);
        return vehicleMakeInfo;
    });

    var transformedVehicles: Vehicle[] = new Array<Vehicle>();
    await Promise.all(vehicleTransforms.map(async (vehicle) => {
        var vehicleTypeRaw = await getVehicleType(vehicle.Make_ID) // TODO: replace with await getVehicleTypeAPI(vehicle.Make_ID)
        var transformedVehicleTypes = transformGetVehicleTypes(vehicleTypeRaw)

        var vehicleTypes: VehicleType[] = new Array<VehicleType>();
        transformedVehicleTypes.forEach((vehicleType) => {
            var transformedVehicleType = transformGetVehicleType(vehicleType);
            var vehicleTypeDTO = new VehicleType(transformedVehicleType.VehicleTypeId, transformedVehicleType.VehicleTypeName);
            vehicleTypes.push(vehicleTypeDTO);
        });
        transformedVehicles.push(new Vehicle(vehicleTypes, Number(vehicle.Make_ID), vehicle.Make_Name))
    }))

    console.log(transformedVehicles)

    return transformedVehicles
}
