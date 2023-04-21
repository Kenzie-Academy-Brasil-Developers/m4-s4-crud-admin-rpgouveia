import { z } from "zod"
import { requestUserSchema, responseUserSchema, userSchema } from "../schemas/user.schemas"

type tUser = z.infer<typeof userSchema>
type tUserRequest = z.infer<typeof requestUserSchema>
type tUserResponse = z.infer<typeof responseUserSchema>

type tEmail = {
  email: string
}

export {
  tUser,
  tUserRequest,
  tUserResponse,
  tEmail
}