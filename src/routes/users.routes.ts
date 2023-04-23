import { Router } from "express"
import { createUserController, deleteUserController, listUserProfileController, listUsersController, recoverUserController, updateUserController } from "../controllers/users.controllers"
import checkEmailExists from "../middlewares/checkEmailExists.middleware"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { requestUserSchema, updateUserSchema } from "../schemas/user.schemas"
import checkTokenValidation from "../middlewares/checkTokenValidation.middleware"
import checkAdminStatus from "../middlewares/checkAdminStatus.middleware"
import checkUserExists from "../middlewares/checkUserExists.middleware"
import checkLoggedUserPermission from "../middlewares/checkLoggedUser.middleware"
import checkUserActiveStatus from "../middlewares/checkUserActiveStatus.middleware"

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
userRoutes.delete(
  '/:id',
  checkUserExists,
  checkTokenValidation,
  checkLoggedUserPermission,
  deleteUserController
  )
userRoutes.put(
  '/:id/recover',
  checkUserExists,
  checkTokenValidation,
  checkAdminStatus,
  checkUserActiveStatus,
  recoverUserController
  )

export default userRoutes