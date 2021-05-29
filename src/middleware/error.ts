import { Response, Request, NextFunction } from "express";

function errorHandler(req: Request, res: Response, next: NextFunction): void {
  console.log("errorHandler");
  next();
}

export default errorHandler;
