import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import { formParser, selector, csvParser, loadHeaderDefs } from "../../lib/fileutil";
import { User } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const data = await formParser(req)
  const file = selector(data, "file")
  const headerDefs = await loadHeaderDefs("user")
  const users = await csvParser<User>(file, headerDefs)
  console.log(users);

  // https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete-all-records-from-all-tables
  await prisma.user.deleteMany()
  // await prisma.$executeRaw`TRUNCATE TABLE User CASCADE;`

  // createMany is not supported by SQLite
  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email
      }
    });
  }

  // await Promise.all(
  //   users.map(async (user) => {
  //     await prisma.user.create({
  //       data: {
  //         name: user.name,
  //         email: user.email
  //       }
  //     });
  //   })
  // )

  res.json({
    ok: true,
    users
  });
  return;
};
export default handler;
