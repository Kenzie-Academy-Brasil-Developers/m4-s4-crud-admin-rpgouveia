import { QueryConfig, QueryResult } from "pg"
import {
  tLoginRequest,
  tLoginResponse,
} from "../../interfaces/login.interfaces"
import { client } from "../../database"
import { tUser } from "../../interfaces/users.interfaces"
import { AppError } from "../../error"
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createLoginService = async (
  payload: tLoginRequest
): Promise<tLoginResponse> => {
  const login = payload
  const searchQuery: string = `SELECT * FROM users WHERE email = $1`
  const queryConfig: QueryConfig = { text: searchQuery, values: [login.email]}
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  const user = queryResult.rows[0]

  if (!user) {
    throw new AppError("Wrong email/password", 401)
  }

  const comparePassword = await bcrypt.compare(login.password, user.password)
    
  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401)
  }
  
  const token: string = jwt.sign(
    { email: user.email },
    "KenzieAcademyBrasil",
    {
      expiresIn: "1d",
      subject: user.id.toString()
    }
  )

  return { token }
}

export default createLoginService