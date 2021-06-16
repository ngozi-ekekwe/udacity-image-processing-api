import { sharpResize, fileExisits } from "../../utilities";
import sharp, { Sharp } from "sharp";

describe("Sharp", () => {
  it("should return an error message if file does not exist", async (done) => {
    const filename = "danceformee";
    const height = 300;
    const width = 300;
    const resizePath = `./public/${filename}${width}x${height}.jpg`;
    const response = await sharpResize(filename, height, width);
    response.toFile(resizePath, (err: Error) => {
      expect(err.message).toEqual('Input file is missing')
    })
    done();
  });

  it('shoud create a resized image', async (done) => {
    const filename = "danceforme";
    const height = 100;
    const width = 1000;
    const imagePath = `./images/${filename}${width}x${height}.jpg`;
    const response = await sharpResize(filename, height, width);
    response.toFile(imagePath, (err: Error, info) => {
      console.log(info, 'tis is ierror')
    });
    const d = await fileExisits(imagePath);
    expect(d).toEqual(true)
    done();

  })
});
