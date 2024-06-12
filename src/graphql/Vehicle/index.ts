import { VehicleType } from "../VehicleType/index";
export class Vehicle {
    vehicleTypes: VehicleType[];
    makeId: number;
    makeName: string;
    constructor(vehicleTypes: VehicleType[], makeId: number, makeName: string) {
        this.vehicleTypes = vehicleTypes;
        this.makeId = makeId;
        this.makeName = makeName;
    }
}