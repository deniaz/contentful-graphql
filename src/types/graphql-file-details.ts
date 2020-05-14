import { GraphQLInt, GraphQLObjectType } from "graphql";
import { GraphQLImage } from "./graphql-image";

export const GraphQLFileDetails = new GraphQLObjectType({
  name: "FileDetails",
  fields: {
    image: { type: GraphQLImage },
    size: { type: GraphQLInt },
  },
});
