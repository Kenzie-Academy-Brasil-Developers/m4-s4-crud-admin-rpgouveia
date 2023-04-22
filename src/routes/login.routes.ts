import { Router } from "express"
import { createLoginController } from "../controllers/login.controllers"
import checkRequestBodyData from "../middlewares/checkRequestBodyData.middleware"
import { requestLoginSchema } from "../schemas/login.schema"

const loginRoutes: Router = Router()

loginRoutes.post('', checkRequestBodyData(requestLoginSchema), createLoginController)

export default loginRoutes