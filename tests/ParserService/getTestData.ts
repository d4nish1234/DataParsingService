import { parseString } from 'xml2js';
import fs from 'fs';
import { fileURLToPath } from 'url';
const path = require("path");


const getAllMakesData = async () => {
    const makesData = await fs.promises.readFile(path.resolve((__dirname + "/allMakes.xml")), "utf-8");
    var out;
    parseString(makesData, (err, result) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getFewMakesData = async () => {
    const makesData = await fs.promises.readFile(path.resolve((__dirname + "/fewMakes.xml")), "utf-8");
    var out;
    parseString(makesData, (err, result) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getVehicleType = async (typeId:string) => {
    const vehicleTypeData = await fs.promises.readFile(path.resolve((__dirname + "/vehicleType.xml")), "utf-8");
    var out;
    parseString(vehicleTypeData, (err, result) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

export { getAllMakesData, getFewMakesData, getVehicleType}