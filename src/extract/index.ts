import { createClient, ContentType } from "contentful";

type ExtractArgs = {
  accessToken: string;
  spaceID: string;
};

export async function extract({
  accessToken,
  spaceID,
}: ExtractArgs): Promise<ContentType[]> {
  const client = createClient({
    accessToken,
    space: spaceID,
  });

  const { items } = await client.getContentTypes();

  return items;
}
