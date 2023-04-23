import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const checkAdminStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {

  const adminStatus: boolean = response.locals.admin

  if (!adminStatus) {
    throw new AppError('Insufficient Permission', 403)
  }

  return next()
}

export default checkAdminStatus