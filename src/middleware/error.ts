import { Response, Request, NextFunction } from 'express';

function errorHandler(req:Request, res: Response, next:NextFunction) {
  console.log('errorHandler')
  next()
};

export default errorHandler;
