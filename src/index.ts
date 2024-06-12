import { app } from "./app";
const port: number = 4000;


const start = async () => {
  try {
    await app.listen(port);
    console.log(`Data Parsing Service is listening on port ${port}`)
  } catch {
    console.log('Not able to run Data Parsing Service GraphQL server');
  }
};

start();