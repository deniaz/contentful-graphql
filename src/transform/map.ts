import { Field } from "contentful";
import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "../scalars/graphql-date";
import { GraphQLLocation } from "../types/graphql-location";
import { GraphQLAsset } from "../types/graphql-asset";

const typeMapping = {
  Text: GraphQLString,
  Symbol: GraphQLString,
  Array: GraphQLString,
  Number: GraphQLFloat,
  Integer: GraphQLInt,
  Boolean: GraphQLBoolean,
  Date: GraphQLDate,
  Location: GraphQLLocation,

  // Link: "wat",
  // Array: "wat",
  // Object: "GraphQLObjectType",
};

const linkTypeMapping = {
  Asset: GraphQLAsset,
  Entry: GraphQLAsset,
};

export function map(field: Field): GraphQLFieldConfig<any, any> {
  if (field.type === "Object") {
    throw new Error(`Fields of Type '${field.type}' are not supported.`);
  }

  if (field.type === "Link") {
    if (!linkTypeMapping[field.linkType]) {
      throw new Error(`Unknown Field Link Type '${field.linkType}'.`);
    }

    return {
      type: field.required
        ? GraphQLNonNull(linkTypeMapping[field.linkType])
        : linkTypeMapping[field.linkType],
    };
  }

  if (!typeMapping[field.type]) {
    throw new Error(`Unknown Field Type '${field.type}'.`);
  }

  return {
    type: field.required
      ? GraphQLNonNull(typeMapping[field.type])
      : typeMapping[field.type],
    description: field.name,
  };
}
