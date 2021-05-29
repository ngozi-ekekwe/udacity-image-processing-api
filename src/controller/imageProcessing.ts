import { Response, Request } from "express";
import sharpResize from "../utilities/sharpResize";

const resizeImage = async (req: Request, res: Response) => {
  const { filename, height, width } = req.query;

  const h: number | null = height ? parseInt(height as string, 10) : null;
  const w: number | null = width ? parseInt(width as string, 10) : null;
  const f: string = filename as unknown as string;

  try {
    await sharpResize(f, h, w);
    const outputfile = `${f}${w}x${h}.jpg`;
    const responseHTML = `<img src=/${outputfile}>`
    res.format({
      'text/html': function () {
        res.send(responseHTML)
      },
    })
  } catch (e) {
    console.log(e)
  }
};

export default resizeImage;
