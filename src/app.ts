var express = require('express');
var { createHandler} = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server")
var { root } = require ('./graphql/resolver');
var { schema } = require ('./graphql/schema');

const app = express();


// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req: any, res: any) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

export { app };