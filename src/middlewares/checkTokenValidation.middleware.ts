import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import jwt from "jsonwebtoken"
import "dotenv/config"

const checkTokenValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization
  if (!token) {
    throw new AppError('Missing Bearer Token', 401)
  }
  token = token?.split(" ")[1]
  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401)
      }
      response.locals.admin = decoded.admin
      response.locals.userId = decoded.sub
  })
  return next()
}

export default checkTokenValidation