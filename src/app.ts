import express, { Request, Response } from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname + "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Image Processing API");
});

export default app;
