import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import * as z from "zod";
import * as formidable from "formidable";
import * as fs from 'fs'

const requestBodySchema = z.object({
  email: z.string(),
  name: z.string(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, _fields, files) {
    if (err) {
      console.error(err)
      return
    }
    const file = files.file as formidable.File;
    const jsonText = fs.readFileSync(file.filepath, 'utf-8')

    try {
      const result = requestBodySchema.parse(JSON.parse(jsonText))
      await prisma.user.create({
        data: {
          email: result.email,
          name: result.name,
        },
      });
    } catch (error) {
      console.error(error)
    }
  })

  res.json({
    ok: true,
  });
  return;
};
export default handler;
