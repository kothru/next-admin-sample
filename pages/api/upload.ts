import type { NextApiHandler } from "next";
import { prisma } from "../../lib/prisma";
import * as z from "zod";
import * as formidable from "formidable";
import * as fs from 'fs'

// const requestBodySchema = z.object({
//   email: z.string(),
//   name: z.string(),
// });

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormidableParseData = {
  fields: formidable.Fields,
  files: formidable.Files
}

const handler: NextApiHandler = async (req, res) => {

  const data = await new Promise((resolve: (value: FormidableParseData) => void, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  console.log(data);

  res.json({
    ok: true,
    data
  });
  return;
};
export default handler;
