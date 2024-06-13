var parseString = require('xml2js').parseString;
var fs = require('fs');
const path = require("path");



const getOneMakeData = async () => {
    const makesData = await fs.promises.readFile(path.resolve((__dirname + "/oneMake.xml")), "utf-8");
    var out;
    parseString(makesData, (err: any, result: any) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getAllMakesData = async () => {
    const makesData = await fs.promises.readFile(path.resolve((__dirname + "/allMakes.xml")), "utf-8");
    var out;
    parseString(makesData, (err: any, result: any) => {
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
    parseString(makesData, (err: any, result: any) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getVehicleType = async (typeId: string) => {
    const vehicleTypeData = await fs.promises.readFile(path.resolve((__dirname + "/vehicleType.xml")), "utf-8");
    var out;
    parseString(vehicleTypeData, (err: any, result: any) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getZeroVehicleType = async (typeId: string) => {
    const vehicleTypeData = await fs.promises.readFile(path.resolve((__dirname + "/zeroVehicleType.xml")), "utf-8");
    var out;
    parseString(vehicleTypeData, (err: any, result: any) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

export { getAllMakesData, getFewMakesData, getVehicleType, getOneMakeData, getZeroVehicleType }