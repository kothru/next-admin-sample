import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import * as z from "zod";
import * as formidable from "formidable";
import { formParser, selector, csvParser } from "../../lib/fileutil";

// const requestBodySchema = z.object({
//   email: z.string(),
//   name: z.string(),
// });

export const config = {
  api: {
    bodyParser: false,
  },
};

type User = {
  email: string,
  name: string
}

const handler: NextApiHandler = async (req, res) => {
  const data = await formParser(req)
  const file = selector(data, "file")
  const users = await csvParser<User>(file)

  console.log(users);

  res.json({
    ok: true,
    users
  });
  return;
};
export default handler;
