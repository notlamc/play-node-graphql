import * as dotenv from "dotenv";

dotenv.config();

import express from "express";

import { graphqlHTTP } from "express-graphql";

import { GraphQLSchema } from "graphql";

import { RootQueryType, RootMutationType } from "./helpers/GraphQLObjectTypes";

const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,

  mutation: RootMutationType,
});

app.use(
  "/graphql",

  graphqlHTTP({
    graphiql: true,

    schema,
  })
);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server running on port ${process.env.APP_PORT}`)
);
