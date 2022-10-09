import type { NextApiRequest } from "next";
import * as formidable from "formidable";
import fs from "node:fs/promises";
import Papa from "papaparse";

type FormidableParseData = {
  fields: formidable.Fields,
  files: formidable.Files
}

export async function formParser(req: NextApiRequest) {
  return new Promise((resolve: (value: FormidableParseData) => void, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve({ fields, files })
    })
  })
}

export function selector(data: FormidableParseData, name: string) {
  const file = data.files[name]
  if (Array.isArray(file)) {
    return file[0]
  } else {
    return file
  }
}

export async function csvParser<T>(file: formidable.File) {
  const fileContents = await fs.readFile(file.filepath, 'utf8');
  const result = Papa.parse<T>(fileContents, {
    header: true
  });
  if (result.errors.length > 0) {
    console.log(result.errors);
  }
  return result.data
}