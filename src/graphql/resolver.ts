import { getAllVehicleMakesAndTypes } from "../ParserService/Vehicles";

// The root provides a resolver function for each API endpoint
var root = {
    getAllVehicleMakesAndTypes() {
        return getAllVehicleMakesAndTypes();
    },
}

export { root };