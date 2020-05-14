import { GraphQLScalarType, Kind } from "graphql";

export const GraphQLDate = new GraphQLScalarType({
  name: "Date",
  serialize(value: Date) {
    return value.getTime();
  },
  parseValue(value: string) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value);
    }

    return null;
  },
});
