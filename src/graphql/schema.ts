import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`

    type VehicleType {
      typeId: Int
      typeName: String
    }
    
    type Vehicle {
      makeId: Int
      makeName: String
      vehicleTypes: [VehicleType]
    }
  
    type Query {
      getAllVehicleMakesAndTypes: [Vehicle]
    }
  `)