import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLFile } from "./graphql-file";

export const GraphQLAsset = new GraphQLObjectType({
  name: "Asset",
  fields: {
    title: { type: GraphQLString },
    file: { type: GraphQLFile },
  },
});
