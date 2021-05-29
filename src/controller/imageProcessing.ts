import { Response, Request } from 'express';
import sharp from "sharp";

function resizeImage(req:Request, res: Response ) {
  res.send('this is image')
}

export default resizeImage;