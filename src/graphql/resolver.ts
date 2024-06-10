import { Vehicle } from "./Vehicle";
import { VehicleType } from "./VehicleType";

var vehicleTypeSample = new VehicleType(6, "Trailer");
var vehicleSample = [new Vehicle([vehicleTypeSample], 34, "Hyundai")];

// The root provides a resolver function for each API endpoint
var root = {
    getAllVehicleMakesAndTypes() {
        return vehicleSample;
    },
}

export { root };