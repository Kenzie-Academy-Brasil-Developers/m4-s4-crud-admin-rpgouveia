import { z } from "zod"
import { requestLoginSchema, responseLoginSchema } from "../schemas/login.schema"

type tLoginRequest = z.infer<typeof requestLoginSchema>
type tLoginResponse = z.infer<typeof responseLoginSchema>

export {
  tLoginRequest,
  tLoginResponse
}