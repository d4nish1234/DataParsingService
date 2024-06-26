var { IVehicleMake, IVehicleTypes } = require("./models");
const transformGetVehicleMakesList = ((rootObj: any): Array<any> => {
    return rootObj.Response.Results[0].AllVehicleMakes;
})

const getVehicleMakesCount = ((rootObj: any): string => {
    return rootObj.Response.Count[0];
})

const transformGetMakeInfo = ((vehicleResponse: any): typeof IVehicleMake => {
    return { Make_ID: vehicleResponse.Make_ID[0], Make_Name: vehicleResponse.Make_Name[0] }
})

const transformGetVehicleTypes = ((rootObj: any): typeof IVehicleTypes[] => {
    if (rootObj.Response.Count[0] !== 0)
        return rootObj.Response.Results[0]["VehicleTypesForMakeIds"];
    return [];
})

const transformGetVehicleType = (vehicleTypeResponse: any) => {
    return { VehicleTypeId: vehicleTypeResponse.VehicleTypeId[0], VehicleTypeName: vehicleTypeResponse.VehicleTypeName[0] }
}

export { transformGetVehicleMakesList, transformGetMakeInfo, transformGetVehicleTypes, transformGetVehicleType, getVehicleMakesCount }