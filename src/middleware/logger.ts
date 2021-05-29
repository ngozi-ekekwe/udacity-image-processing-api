import { Response, Request, NextFunction } from "express";

function logger(req: Request, res: Response, next: NextFunction): void {
  console.log("middlware logger");
  next();
}

export default logger;
