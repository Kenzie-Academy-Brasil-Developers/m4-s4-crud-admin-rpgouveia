import { Request, Response } from "express"
import { tUserRequest, tUserResponse } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUser.service"
import listUsersService from "../services/users/listUsers.service"
import listUserProfileService from "../services/users/listUserProfile.service"

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: tUserRequest = request.body
  const newUser: tUserResponse = await createUserService(userData)
  return response.status(201).json(newUser)
}

const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {  
  const users = await listUsersService()
  return response.json(users)
}

const listUserProfileController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = Number(response.locals.userId)
  const user = await listUserProfileService(userId)
  return response.json(user)
}

export {
  createUserController,
  listUsersController,
  listUserProfileController
}