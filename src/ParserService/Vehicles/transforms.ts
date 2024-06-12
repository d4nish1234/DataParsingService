import { IVehicleMake } from "./models.js";
const transformGetVehicleMakesList = ((rootObj: any): Array<any> => {
    return rootObj.Response.Results[0].AllVehicleMakes;
})

const transformGetMakeInfo = ((vehicleResponse: any): IVehicleMake => {
    return { Make_ID: vehicleResponse.Make_ID[0], Make_Name: vehicleResponse.Make_Name[0] }
})

export { transformGetVehicleMakesList, transformGetMakeInfo }