import { ContentType } from "contentful";
import { GraphQLObjectType } from "graphql";
import { map } from "./map";

export function transform(contentTypes: ContentType[]): GraphQLObjectType[] {
  return contentTypes.map((contentType) => {
    const fields = contentType.fields.reduce(
      (prev, field) => ({
        ...prev,
        [field.id]: map(field),
      }),
      {}
    );

    const typeID = contentType.sys.id;
    const graphqlTypeName =
      typeID.charAt(0).toLocaleUpperCase() + typeID.slice(1);

    return new GraphQLObjectType({
      name: graphqlTypeName,
      description: contentType.description,
      fields,
    });
  });
}
