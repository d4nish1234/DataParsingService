import { parseString } from 'xml2js';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


const getAllMakesData = async () => {
    const allMakesDataXML = await fs.promises.readFile(__dirname + "/allMakes.xml", "utf-8");
    var out;
    parseString(allMakesDataXML, (err, result) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

const getFewMakesData = async () => {
    const allMakesDataXML = await fs.promises.readFile(__dirname + "/fewMakes.xml", "utf-8");
    var out;
    parseString(allMakesDataXML, (err, result) => {
        if (err) {
            console.log(err)
        }
        out = result
    })
    return out;
}

export { getAllMakesData, getFewMakesData }