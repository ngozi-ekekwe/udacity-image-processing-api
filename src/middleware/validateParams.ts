import { Response, Request, NextFunction } from "express";

function validateParams(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  const requiredParams = ["filename", "height", "width"];

  for (let i = 0; i < requiredParams.length; i++) {
    const param = requiredParams[i];
    if (query[param] === undefined) {
      res.status(400).send("Error: Invalid Parameter..");
      return;
    }

    const value = query[param];

    if (param == "filename" && typeof value !== "string") {
      res.status(400).send("Filename should be a string");
      return;
    }

    if (param == "height" || param == "width") {
      let num: number = Number(value);
      if (!num) {
        res.status(400).send("height and width should be numbers");
        return;
      }
    }
  }
  next();
}

export default validateParams;
