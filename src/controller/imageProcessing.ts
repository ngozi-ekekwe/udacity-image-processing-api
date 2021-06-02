import { Response, Request } from "express";
import sharpResize from "../utilities/sharpResize";
import fs from "fs";

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, height, width } = req.query;

  const h: number | null = height ? parseInt(height as string, 10) : null;
  const w: number | null = width ? parseInt(width as string, 10) : null;
  const f: string = filename as unknown as string;

  try {
    await sharpResize(f, h, w);
    const outputfile = `${f}${w}x${h}.jpg`;
    const responseHTML = `<img src=/${outputfile}>`;
    res.status(200).format({
      "text/html": function () {
        res.send(responseHTML);
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const readThumbnailFullPaths = (req: Request, res: Response): void => {
  const directory = "public";
  const data = fs.readdirSync(directory);
  const thumbnails = data.map((d) => {
    return `http://localhost:3001/${d}`;
  });
  res.status(200).send({
    thumbnails,
  });
};

export default resizeImage;
