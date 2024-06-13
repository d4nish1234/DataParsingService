var axios = require('axios');
var parseString = require('xml2js').parseString;
var { Vehicle } = require('../../graphql/Vehicle/index');
var { VehicleType } = require('../../graphql/VehicleType/index');
var IVehicleMake = require('./models');
const { Sequelize, DataTypes } = require('sequelize');
// const { getFewMakesData, getVehicleType } = require('../../../tests/ParserService/getTestData'); // FOR TESTS
var { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType, getVehicleMakesCount } = require('./transforms');

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

    var rawVehiclesData = await getMakesAPI(); // PART 1 LIVE
    // var rawVehiclesData = await getFewMakesData(); // PART 1 TEST
    var vehicleCount = getVehicleMakesCount(rawVehiclesData);
    console.log("total vehicles count: " + vehicleCount)
    var vehicleTransforms = transformGetVehicleMakesList(rawVehiclesData).map((vehicle: any) => {
        const vehicleMakeInfo: typeof IVehicleMake = transformGetMakeInfo(vehicle);
        return vehicleMakeInfo;
    });

    var transformedVehicles: typeof Vehicle[] = new Array<typeof Vehicle>();

    // var vehicleTypeRaw = await getVehicleType("1") // PART 2 TEST 

    var interval = 200; // how much time should the delay between two iterations be (in milliseconds)?
    for await (const vehicle of vehicleTransforms) {

        await new Promise(resolve => setTimeout(resolve, interval));

        var vehicleTypeRaw = await getVehicleTypeAPI(vehicle.Make_ID) // PART 2 LIVE
        var transformedVehicleTypes = await transformGetVehicleTypes(vehicleTypeRaw)

        var vehicleTypes: typeof VehicleType[] = new Array<typeof VehicleType>();
        if (transformedVehicleTypes) {
            transformedVehicleTypes.forEach((vehicleType: any) => {
                var transformedVehicleType = transformGetVehicleType(vehicleType);
                var vehicleTypeDTO = new VehicleType(transformedVehicleType.VehicleTypeId, transformedVehicleType.VehicleTypeName);
                vehicleTypes.push(vehicleTypeDTO);
            });
        }
        transformedVehicles.push(new Vehicle(vehicleTypes, Number(vehicle.Make_ID), vehicle.Make_Name))
    }

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
