import { Request, Response } from "express";
import { tLoginRequest, tLoginResponse } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.service";

const createLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: tLoginRequest = request.body
  const token: tLoginResponse = await createLoginService(userData)

  return response.status(200).json(token)
}

export {
  createLoginController
}