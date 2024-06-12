import { getAllMakesData, getFewMakesData } from "../getMakesData";
import { transformGetVehicleMakesList, transformGetMakeInfo } from "../../../src/ParserService/Vehicles/transforms";
import { test, describe, it, beforeEach, mock } from "node:test"
import { IVehicleMake, IVehicleTypes } from '../../../src/ParserService/Vehicles/models.js';
import assert from "node:assert"

describe('vehicles transforms test suite', () => {

  test('get a few vehicles', async () => {
    var fewMakesData = await getFewMakesData();
    assert.strictEqual(3, transformGetVehicleMakesList(fewMakesData).length);
  })


  test('get all vehicles', async () => {
    var allMakesData = await getAllMakesData();
    assert.strictEqual(11340, transformGetVehicleMakesList(allMakesData).length);
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


  test('actual test', async () => {
    var allMakesData = await getFewMakesData();
    var finalTransform = transformGetVehicleMakesList(allMakesData).map(vehicle => {
      const vehicleMakeInfo: IVehicleMake = transformGetMakeInfo(vehicle);
      return vehicleMakeInfo;
    });
    console.log(finalTransform)
  })
});