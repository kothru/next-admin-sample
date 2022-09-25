import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  try {
    // const result = requestBodySchema.parse(req.body);
    console.log(req.body)
    // await prisma.post.create({
    //   data: {
    //     title: result.title,
    //     content: result.content,
    //     published: true,
    //   },
    // });
    res.json({
      ok: true,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};
export default handler;
