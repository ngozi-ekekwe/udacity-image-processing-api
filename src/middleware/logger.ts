import { Response, Request, NextFunction } from 'express';

function logger(req:Request, res: Response, next:NextFunction) {
  console.log('logger')
  next()
};

export default logger;
