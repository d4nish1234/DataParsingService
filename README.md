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

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
* Use [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to commit into repo for easier read