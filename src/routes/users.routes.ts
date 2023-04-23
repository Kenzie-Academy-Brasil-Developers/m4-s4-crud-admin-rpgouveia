import { Router } from "express"
import { createUserController, listUserProfileController, listUsersController, updateUserController } from "../controllers/users.controllers"
import checkEmailExists from "../middlewares/checkEmailExists.middleware"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { requestUserSchema, updateUserSchema } from "../schemas/user.schemas"
import checkTokenValidation from "../middlewares/checkTokenValidation.middleware"
import checkAdminStatus from "../middlewares/checkAdminStatus.middleware"
import checkUserExists from "../middlewares/checkUserExists.middleware"
import checkLoggedUserPermission from "../middlewares/checkLoggedUser.middleware"

const userRoutes: Router = Router()

userRoutes.post('', checkRequestBodyData(requestUserSchema), checkEmailExists, createUserController)
userRoutes.get('', checkTokenValidation, checkAdminStatus, listUsersController)
userRoutes.get('/profile', checkTokenValidation, listUserProfileController)
userRoutes.patch(
  '/:id', 
  checkUserExists, 
  checkRequestBodyData(updateUserSchema),
  checkTokenValidation,
  checkLoggedUserPermission,
  checkEmailExists,
  updateUserController
)

export default userRoutes