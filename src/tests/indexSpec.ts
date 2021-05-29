import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("Server API", () => {
  it("should return a message", async (done) => {
    const response = await request.get("/");
    expect(response.text).toBe("Welcome to Image Processing API");
    done();
  });

  it("should should return a status of 200", async (done) => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    done();
  });
});

describe("Resize Controller Middleware", () => {
  it('should return an error is a parameter is missing', async(done) => {
    const response = await request.get("/api/images");
    expect(response.text).toBe('Error: Parameter(s) missing..');
    done();
  });

  it('should return an error message if width is not a number', async(done) => {
    const response = await request.get("/api/images?filename=danceforme&width=hello&height=400");
    expect(response.text).toBe('height and width should be numbers');
    done();
  });

  it('should return an error message if height is not a number', async(done) => {
    const response = await request.get("/api/images?filename=danceforme&width=hello&height=hello");
    expect(response.text).toBe('height and width should be numbers');
    done();
  });

  it('should return a status of 400 if an error occured', async(done) => {
    const response = await request.get("/api/images?filename=danceforme&width=hello&height=hello");
    expect(response.status).toBe(400);
    done();
  });

  describe('Resize Controller', () => {
    it('should resize a full image into the public folder', async(done) => {
      const response = await request.get("/api/images?filename=danceforme&width=400&height=300");
      expect(response.status).toBe(200);
      done();
    })
  })
})