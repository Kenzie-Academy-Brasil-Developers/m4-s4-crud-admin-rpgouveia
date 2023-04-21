import { Request, Response } from "express"
import { tUserRequest, tUserResponse } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUser.service"
import listUsersService from "../services/users/listUsers.service"

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: tUserRequest = request.body
  const newUser: tUserResponse = await createUserService(userData)
  return response.status(201).json(newUser)
}

// Sem Admin Token para Listar Usuários
const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService()
  return response.json(users)
}

export {
  createUserController,
  listUsersController
}