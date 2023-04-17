import { Request, Response } from "express"
import { iUser } from "../interfaces/users.interfaces"
import createUserService from "../services/createUser.service"

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: iUser = request.body
  const newUser: string = await createUserService(userData)
  return response.status(201).json(newUser)
}

export {
  createUserController
}