import express, { Request, Response } from "express";
import router from "./routes";
import cors from "cors";
import { logger, errorHandler } from "./middleware";

const app = express();

app.use(express.static("public"));

app.use(logger);

app.use(cors());

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Welcome to Image Processing API");
});

// health check
app.get("/health", (_req: Request, res: Response) => {
  res.send({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});

app.use(router);

app.use(errorHandler);

export default app;
