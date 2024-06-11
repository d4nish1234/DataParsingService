export const transformGetAllVehicleMakes = ((rootObj:any) : Array<any> => {
    return rootObj.Response.Results[0].AllVehicleMakes;
})