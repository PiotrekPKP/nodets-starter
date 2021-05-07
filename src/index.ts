import 'reflect-metadata';
import { ApolloServer, Request } from 'apollo-server-express';
import mongoose from "mongoose";
import express from "express";

import { MONGODB, PORT } from "../config";
import { createSchema, errorFormatting, getContext } from "./utils/schema";
import { GraphQLError } from "graphql";
import * as http from "http";

const main = async () => {
    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
        formatError: (error: GraphQLError) => errorFormatting(error),
        context: ({ req }: { req: Request }) => getContext({ req })
    });

    const app = express();
    apolloServer.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    await mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
    httpServer.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/graphql`))
}

main().then(() => console.log('Server initialized'));