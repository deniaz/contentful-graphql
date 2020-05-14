import { createClient } from "contentful";
import {
  GraphQLFieldConfigMap,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import pluralize from "pluralize";
import { GraphQLDate } from "../scalars/graphql-date";
import { GraphQLLocation } from "../types/graphql-location";
import { GraphQLAsset } from "../types/graphql-asset";
import { GraphQLFileDetails } from "../types/graphql-file-details";
import { GraphQLFile } from "../types/graphql-file";
import { GraphQLImage } from "../types/graphql-image";

type LoadArgs = {
  accessToken: string;
  spaceID: string;
};

export function load(
  objectTypes: GraphQLObjectType[],
  { accessToken, spaceID }: LoadArgs
) {
  const client = createClient({
    accessToken,
    space: spaceID,
  });

  const fields: GraphQLFieldConfigMap<any, any> = objectTypes.reduce(
    (acc, type) => {
      return {
        ...acc,
        [`all${pluralize(type.name)}`]: {
          type: new GraphQLList(type),
          resolve: async () => {
            const contentType =
              type.name.charAt(0).toLocaleLowerCase() + type.name.slice(1);

            const entries = await client.getEntries({
              content_type: contentType,
              include: 3,
            });

            return entries.items.map((item) => item.fields);
          },
        },
      };
    },
    {}
  );

  const query = new GraphQLObjectType({
    name: "Query",
    fields: {
      ...fields,
    },
  });

  const schema = new GraphQLSchema({
    query,

    types: [
      GraphQLDate,
      GraphQLAsset,
      GraphQLFileDetails,
      GraphQLFile,
      GraphQLImage,
      GraphQLLocation,
    ],
  });

  return schema;
}
