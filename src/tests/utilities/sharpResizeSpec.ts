import { sharpResize, fileExisits } from "../../utilities";

describe("Sharp", () => {
  it("should return an error message if file does not exist", async (done) => {
    const filename = "danceformee";
    const height = 300;
    const width = 300;
    const resizePath = `./public/${filename}${width}x${height}.jpg`;
    const response = await sharpResize(filename, height, width);
    response.toFile(resizePath, (err: Error) => {
      expect(err.message).toEqual("Input file is missing");
    });
    done();
  });

  it("shoud create a resized image", async (done) => {
    const filename = "danceforme";
    const height = 200;
    const width = 500;
    const testPath = `./src/tests/images/${filename}${width}x${height}.jpg`;
    const response = await sharpResize(filename, height, width);
    await response.toFile(testPath, async () => {
      const d = await fileExisits(testPath);
      expect(d).toEqual(true);
    });
    done();
  });
});
