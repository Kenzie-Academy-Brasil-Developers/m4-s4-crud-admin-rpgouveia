import { Router } from "express"
import { createUserController, listUsersController } from "../controllers/users.controllers"
import checkEmailExistsMiddleware from "../middlewares/checkEmailExists.middleware"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { requestUserSchema } from "../schemas/user.schemas"

const userRoutes: Router = Router()

userRoutes.post('', checkRequestBodyData(requestUserSchema), checkEmailExistsMiddleware, createUserController)
userRoutes.get('', listUsersController)

export default userRoutes