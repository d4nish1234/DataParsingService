var VehicleType = require("../VehicleType/index");
export class Vehicle {
    vehicleTypes: typeof VehicleType[];
    makeId: number;
    makeName: string;
    constructor(vehicleTypes: typeof VehicleType[], makeId: number, makeName: string) {
        this.vehicleTypes = vehicleTypes;
        this.makeId = makeId;
        this.makeName = makeName;
    }
}