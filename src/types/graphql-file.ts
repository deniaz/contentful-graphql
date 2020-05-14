import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLFileDetails } from "./graphql-file-details";

export const GraphQLFile = new GraphQLObjectType({
  name: "File",
  fields: {
    fileName: { type: GraphQLString },
    contentType: { type: GraphQLString },
    details: { type: GraphQLFileDetails },
    url: { type: GraphQLString },
  },
});
