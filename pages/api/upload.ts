import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import { formParser, selector, csvParser } from "../../lib/fileutil";
import { User } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const data = await formParser(req)
  const file = selector(data, "file")
  const users = await csvParser<User>(file)

  // createMany is not supported by SQLite
  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

  users.forEach(async (user) => {
    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email
      }
    });
  })

  console.log(users);

  res.json({
    ok: true,
    users
  });
  return;
};
export default handler;
