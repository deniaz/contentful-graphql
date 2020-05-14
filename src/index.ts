import { extract } from "./extract";
import { load } from "./load";
import { transform } from "./transform";
import { printSchema } from "graphql";

type Args = {
  accessToken: string;
  spaceID: string;
};
export async function generateGraphQLFromSpace({ accessToken, spaceID }: Args) {
  const contentTypes = await extract({
    accessToken,
    spaceID,
  });

  const objectTypes = transform(contentTypes);

  const schema = load(objectTypes, {
    accessToken,
    spaceID,
  });

  console.info(printSchema(schema));

  return schema;
}
