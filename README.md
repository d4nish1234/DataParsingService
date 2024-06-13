# DataParsingService
A proof of concept of a project structure for a service that parses data serialization format from XML to JSON

## Onboarding

### Requirements
The following app and their version was used to build the application
- Node: 18.18.0
- NPM: 10.8.1
- latest version of Docker

### Installing dependencies and running the app
- Execute `npm i` to download all node dependencies
- To run the application locally execute `npm run dev`
- To build from tsc to js execute `npm run build` followed by `npm run start`
- View the graphql GUI interface via http://localhost:4000

### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:4000.

### Unit Tests

To run test execute `npm run test`. On higher version of nodde you might need to make changes to the script from `--loader` to `--import`

### Conventional Commits
Use [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to commit into repo for easier read

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
* [Getting started with GraphQL](https://graphql.org/graphql-js/)
* [Converting JS to typescript](https://medium.com/@mhuckstepp/step-by-step-guide-to-convert-an-existing-express-node-js-backend-to-typescript-931e435ea95d)

# Considerations

- The API is really difficult to work with because even though the API can be mocked I constantly found myself getting "Access Denied" response from the vehicles API call. To mitigate this, I put a delay of 200ms in between get vehicle type information. This could be sped up by understanding what the time to hit the API treshold for the downstream service is.
- I used SQL lite to persist data, but ideally we should use an ORM database or a nosql db to persist data, which brings more options
- Next steps:
    - Adding lint and prettier tools
    - For future services, devs can expand ParserService or create additional services for different actions
    - Xml to json can also be parsed using dynamic cycling. Meaning any xml would convert to json with transformations in between (using patterns)
    - Caching is crutial for this project, since parsing can be huge, we can use something like Redis to perform caching. We can also leverage existing database and expire the data after x amount of days.