import { graphql } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { generateGraphQLFromSpace } from "../../";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = "nQLW863xUZ0rw8uuo7WNFkqLzvvrYXb6PyGSwaJoW6c";
  const spaceID = "2brimijurs6z";

  const schema = await generateGraphQLFromSpace({ accessToken, spaceID });

  const query = req.body.query;
  const variables = req.body.variables;

  const response = await graphql(schema, query, variables);

  return res.send(response);
};
