import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from "graphql";

export const GraphQLLocation = new GraphQLObjectType({
  name: "Location",
  fields: {
    lat: { type: GraphQLNonNull(GraphQLFloat) },
    lon: { type: GraphQLNonNull(GraphQLFloat) },
  },
});
