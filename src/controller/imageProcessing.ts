import fs from "fs";
import path from "path";
import { Response, Request } from "express";

import { sharpResize, fileExisits } from "../utilities";

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, height, width } = req.query;

  const h: number | null = height ? parseInt(height as string, 10) : null;
  const w: number | null = width ? parseInt(width as string, 10) : null;
  const f: string = filename as unknown as string;

  try {
    const imagePath = `${f}${w}x${h}.jpg`;
    const resizePath = `./public/${f}${w}x${h}.jpg`;
    const imagePathExists = await fileExisits(path.join("public", imagePath));

    // send cached file
    if (imagePathExists) {
      res.sendFile(`/${imagePath}`, { root: path.join("./public") });
    } else {
      const response = await sharpResize(f, h, w);
      response.toFile(resizePath, (error: Error) => {
        if (error) {
          res.status(403).send({
            ok: "failed",
            message: error.message,
          });
        } else {
          res.sendFile(`/${imagePath}`, { root: path.join("./public") });
        }
      });
    }
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
