import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"

const checkLoggedUserPermission = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = Number(request.params.id)
  const isAdmin = response.locals.admin
  const loggedUserId = Number(response.locals.userId)

  if (!isAdmin && loggedUserId !== userId) {
    throw new AppError('Insufficient Permission', 403)
  }

  return next()
}

export default checkLoggedUserPermission