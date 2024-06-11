import { getAllVehicleMakesAndTypes } from "../ParserService/Vehicles/index.js";

// The root provides a resolver function for each API endpoint
var root = {
    getAllVehicleMakesAndTypes() {
        return getAllVehicleMakesAndTypes();
    },
}

export { root };