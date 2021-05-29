import sharp from "sharp";

export const sharpResize = async (
  f: string | null,
  h: number | null,
  w: number | null
): Promise<void> => {
  const buffer = `assets/full/${f}.jpg`;
  const outputfile = `./public/${f}${w}x${h}.jpg`;
  const image = await sharp(buffer);
  const resizedimage = await image.resize(w, h);
  resizedimage.toFile(outputfile);
};

export default sharpResize;
