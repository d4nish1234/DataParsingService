import { getAllMakesData, getFewMakesData } from "../getMakesData";
import { transformGetAllVehicleMakes } from "../../../src/ParserService/Vehicles/transforms";
import { test, describe, it, beforeEach, mock } from "node:test"
import assert from "node:assert"

describe('vehicles', () => {

  test('get a few vehicles', async () => {


    var fewMakesData = await getFewMakesData();
    console.log("getting..." , fewMakesData)
      
    // var allMakesData = await getAllMakesData();
    
    assert(3, transformGetAllVehicleMakes(fewMakesData).length.toString());
  })

});