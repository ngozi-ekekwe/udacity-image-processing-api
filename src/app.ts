import express, { Request, Response } from "express";
import router from "./routes";
import { logger, errorHandler, validateParams } from "./middleware";

const app = express();

app.use(express.static("public"));

app.use(logger);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Image Processing API");
});

app.use(validateParams);

app.use(router);

app.use(errorHandler);

export default app;
