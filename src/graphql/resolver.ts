import { getAllVehicleMakesAndTypes } from "../ParserService/Vehicles/index";

let promiseData = () => {
    return new Promise((resolve, reject) => {
        resolve(getAllVehicleMakesAndTypes())
    });
};
// The root provides a resolver function for each API endpoint
var root = {
    getAllVehicleMakesAndTypes() {
        return promiseData();
    },
}

export { root };