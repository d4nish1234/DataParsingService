var { getAllMakesData, getFewMakesData, getVehicleType, getZeroVehicleType } = require  ("../getTestData");
var { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType, getVehicleMakesCount } = require  ("../../../src/ParserService/Vehicles/transforms");
var { test, describe, it, beforeEach, mock } = require  ("node:test")
var { IVehicleMake, IVehicleTypes } = require  ('../../../src/ParserService/Vehicles/models');
var assert = require ("node:assert")

describe('vehicles transforms test suite', () => {

  test('get a few vehicles', async () => {
    var fewMakesData = await getFewMakesData();
    assert.strictEqual(3, transformGetVehicleMakesList(fewMakesData).length);
  })


  test('get all vehicles and test count', async () => {
    var allMakesData = await getAllMakesData();
    var count = getVehicleMakesCount(allMakesData);
    assert.strictEqual(Number(count), transformGetVehicleMakesList(allMakesData).length);
  })

  test('get Make id and name', async () => {
    var fewMakesData = await getFewMakesData();
    var firstMakeData = transformGetVehicleMakesList(fewMakesData)[0]
    var firstMakeTransform = transformGetMakeInfo(firstMakeData);
    assert.strictEqual("12858", firstMakeTransform.Make_ID);
    assert.strictEqual("#1 ALPINE CUSTOMS", firstMakeTransform.Make_Name);
  })

  test('get Make id and name', async () => {
    var fewMakesData = await getFewMakesData();
    var firstMakeData = transformGetVehicleMakesList(fewMakesData)[0]
    var firstMakeTransform = transformGetMakeInfo(firstMakeData);
    assert.strictEqual("12858", firstMakeTransform.Make_ID);
    assert.strictEqual("#1 ALPINE CUSTOMS", firstMakeTransform.Make_Name);
  })

  test('get vehicle type', async () => {
    var fewMakesData = await getFewMakesData();
    var vehicleTransforms = transformGetVehicleMakesList(fewMakesData).map(vehicle => {
      const vehicleMakeInfo: typeof IVehicleMake = transformGetMakeInfo(vehicle);
      return vehicleMakeInfo;
    });

    var vehicleTypeRaw = await getVehicleType(vehicleTransforms[0].Make_ID)
    var transformedVehicleTypes = transformGetVehicleTypes(vehicleTypeRaw)
    assert('2', transformedVehicleTypes[0].VehicleTypeId[0])
    assert('Passenger Car', transformedVehicleTypes[0].VehicleTypeName[0])
  })

  test('get vehicle type', async () => {
    var fewMakesData = await getFewMakesData();
    var vehicleTransforms = transformGetVehicleMakesList(fewMakesData).map(vehicle => {
      const vehicleMakeInfo: typeof IVehicleMake = transformGetMakeInfo(vehicle);
      return vehicleMakeInfo;
    });

    var vehicleTypeRaw = await getZeroVehicleType(vehicleTransforms[0].Make_ID)
    var transformedVehicleTypes = transformGetVehicleTypes(vehicleTypeRaw)
    assert('undefined', transformedVehicleTypes)
  })

  
});