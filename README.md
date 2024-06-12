# DataParsingService
A proof of concept of a project structure for a service that parses data serialization format from XML to JSON

## Onboarding

### Requirements
Ensure you have the following:
- Node: 18.18.0+
- NPM: 10.8.1+
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

### Conventional Commits
Use [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to commit into repo for easier read

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
* [Getting started with GraphQL](https://graphql.org/graphql-js/)
* [Converting JS to typescript](https://medium.com/@mhuckstepp/step-by-step-guide-to-convert-an-existing-express-node-js-backend-to-typescript-931e435ea95d)

# Considerations

- The API is really difficult to work with because even though the API can be mocked I constantly found myself getting "Access Denied" response from the vehicles API call. To mitigate this, we can use a sleep, but the con for that is it will take longer to debug and fix any issues that come as part of parsing. Parsing can also be done in increments of say 100 and know how much parsing was done, that is a workaround for running into "hitting too many API in short amount of time issue"
- I used SQL lite to persist data, but ideally we should use an ORM database or a nosql db to persist data, which brings more options
- Next steps:
    - Adding lint and prettier tools
    - For future services, devs can expand ParserService or create additional services for different actions
    - Xml to json can also be parsed using dynamic cycling. Meaning any xml would convert to json with transformations in between (using patterns)
    - Caching is crutial for this project, since parsing can be huge, we can use something like Redis to perform caching