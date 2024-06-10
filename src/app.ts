import express, { Express, Request, Response } from 'express';
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { root } from './graphql/resolver';
import { schema } from './graphql/schema';

const app: Express = express();


// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req: Request, res: Response) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

export { app };