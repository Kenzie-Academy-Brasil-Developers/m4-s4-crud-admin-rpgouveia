import { Router } from "express"
import { createUserController, listUserProfileController, listUsersController } from "../controllers/users.controllers"
import checkEmailExists from "../middlewares/checkEmailExists.middleware"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { requestUserSchema } from "../schemas/user.schemas"
import checkTokenValidation from "../middlewares/checkTokenValidation.middleware"
import checkAdminStatus from "../middlewares/checkAdminStatus.middleware"

const userRoutes: Router = Router()

userRoutes.post('', checkRequestBodyData(requestUserSchema), checkEmailExists, createUserController)
userRoutes.get('', checkTokenValidation, checkAdminStatus, listUsersController)
userRoutes.get('/profile', checkTokenValidation, listUserProfileController)

export default userRoutes