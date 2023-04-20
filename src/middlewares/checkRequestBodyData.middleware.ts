import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

const checkRequestBodyData = (schema: ZodTypeAny) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data = schema.parse(request.body)
  request.body = data
  return next()
}

export default checkRequestBodyData