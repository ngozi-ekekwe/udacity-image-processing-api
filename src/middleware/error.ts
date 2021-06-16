import { Response, Request, NextFunction } from "express";

function errorHandler(req: Request, res: Response, next: NextFunction): void {
  const responseHTML = `<p>There was an error processing your image</p>`;
  res.send(responseHTML);
}

export default errorHandler;
