import axios from 'axios';
import { parseString } from 'xml2js';
import { Vehicle } from '../../graphql/Vehicle/index.js';
import { VehicleType } from '../../graphql/VehicleType/index.js';
import { transformGetAllVehicleMakes } from './transforms.js';
export const getAllVehicleMakesAndTypes = () => {

    // axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/12858?format=xml").then((res) => {
    //     var parsedXML = parseString(res.data, (err, result) => {
    //         console.log(result.Response.Results[0]["VehicleTypesForMakeIds"]);
    //     })
    // });

    // axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML").then((res) => {
    //     parseString(res.data, (err, result) => {

    //         // TODO ETL test case needed
    //         interface VehicleMake {
    //             Make_ID: string
    //             Make_Name: string
    //         }
    //         interface VehicleTypes {
    //             VehicleTypeId: number
    //             VehicleTypeName: string
    //         }


    //         transformGetAllVehicleMakes(res).map((el: VehicleMake) => {
    //             var vehicleTypes: [VehicleTypes];
    //             axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${el.Make_ID}?format=xml`).then((res) => {
    //                 parseString(res.data, (err, result) => {
    //                     vehicleTypes = result.Response.Results[0]["VehicleTypesForMakeIds"];
    //                     return {
    //                         makeId: el.Make_ID,
    //                         makeName: el.Make_Name,
    //                         vehicleTypes
    //                     }
    //                 })
    //             })
    //         });


    //     })
    // }).catch((error) => {
    //     console.error("getAllVehicleMakesAndTypes - could not retreive data for all makes!", error);
    // })


    var vehicleTypeSample = new VehicleType(6, "Trailer");
    return [new Vehicle([vehicleTypeSample], 34, "Hyundai")];

}