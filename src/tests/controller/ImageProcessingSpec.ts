import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Resize Controller Middleware", () => {
  it("should return an error is a parameter is missing", async (done) => {
    const response = await request.get("/api/images");
    expect(response.text).toBe("Error: Parameter(s) missing..");
    done();
  });

  it("should return an error message if width is not a number", async (done) => {
    const response = await request.get(
      "/api/images?filename=danceforme&width=hello&height=400"
    );
    expect(response.text).toBe("height and width should be numbers");
    done();
  });

  it("should return an error message if height is not a number", async (done) => {
    const response = await request.get(
      "/api/images?filename=danceforme&width=hello&height=hello"
    );
    expect(response.text).toBe("height and width should be numbers");
    done();
  });

  it("should return a status of 400 if an error occured", async (done) => {
    const response = await request.get(
      "/api/images?filename=danceforme&width=hello&height=hello"
    );
    expect(response.status).toBe(400);
    done();
  });

  it("should return a message if image does not exist", async (done) => {
    const response = await request.get(
      "/api/images?filename=filenotFound&width=400&height=300"
    );
    expect(response.status).toBe(403);
    expect(response.body.ok).toBe("failed");
    expect(response.body.message).toBe("Input file is missing");
    done();
  });
});
