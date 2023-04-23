import { z } from "zod"
import { requestUserSchema, responseUserSchema, updateUserSchema, userSchema } from "../schemas/user.schemas"

type tUser = z.infer<typeof userSchema>
type tUserRequest = z.infer<typeof requestUserSchema>
type tUserResponse = z.infer<typeof responseUserSchema>
type tUserUpdateRequest = z.infer<typeof updateUserSchema>

type tEmail = {
  email: string
}

export {
  tUser,
  tUserRequest,
  tUserResponse,
  tEmail,
  tUserUpdateRequest
}