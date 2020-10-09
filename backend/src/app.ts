import { makeSchema } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Mutation } from "./nexus/mutationType";
import { Query } from "./nexus/queryType";
import * as path from "path";
import ObjectTypes from "./nexus/objectType";

const prisma = new PrismaClient();

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    typegenAutoConfig: {
      contextType: "{ prisma: PrismaClient.PrismaClient }",
      sources: [{ source: ".prisma/client", alias: "PrismaClient" }],
    },
    outputs: {
      typegen: path.join(__dirname, "./gen/types/index.d.ts"),
      schema: path.join(__dirname, "./gen/graphql/api.graphql"),
    },
    shouldExitAfterGenerateArtifacts: Boolean(
      process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION
    ),
    types: [...ObjectTypes, Query, Mutation],
  }),
});

const app = express();

apollo.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`);
});
