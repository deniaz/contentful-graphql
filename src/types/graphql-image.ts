import { GraphQLInt, GraphQLObjectType } from "graphql";

export const GraphQLImage = new GraphQLObjectType({
  name: "Image",
  fields: {
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
  },
});
