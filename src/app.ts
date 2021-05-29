import express, { Request, Response } from "express";
import path from "path";
import router from "./routes";
import { logger, errorHandler, validateParams } from "./middleware";

const app = express();

app.use(express.static(path.join(__dirname + "public")));

app.use(logger);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Image Processing API");
});

app.use(validateParams);

app.use(router);

app.use(errorHandler);

export default app;
