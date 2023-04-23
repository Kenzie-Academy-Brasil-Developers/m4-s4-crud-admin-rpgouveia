import { Request, Response } from "express"
import { tUserRequest, tUserResponse, tUserUpdateRequest } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUser.service"
import listUsersService from "../services/users/listUsers.service"
import listUserProfileService from "../services/users/listUserProfile.service"
import updateUserService from "../services/users/updateUser.service"
import deleteUserService from "../services/users/deleteUser.service"

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

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = Number(request.params.id)
  const loggedUserId = Number(response.locals.userId)
  const isAdmin: boolean = response.locals.admin
  const userData: tUserUpdateRequest = request.body
  const user: tUserResponse = await updateUserService(userId, loggedUserId, isAdmin, userData)
  return response.json(user)
}

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = Number(request.params.id)
  await deleteUserService(userId)
  return response.status(204).send()
}

export {
  createUserController,
  listUsersController,
  listUserProfileController,
  updateUserController,
  deleteUserController
}