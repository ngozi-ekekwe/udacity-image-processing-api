import { Response, Request, NextFunction } from 'express';

function validateParams(req:Request, res: Response, next:NextFunction) {
  console.log('validateParams')
  next()
};

export default validateParams;
