import format from "pg-format"
import { tUser, tUserRequest, tUserResponse } from "../../interfaces/users.interfaces"
import { QueryResult } from "pg"
import { client } from "../../database"
import * as bcrypt from "bcryptjs"
import { responseUserSchema } from "../../schemas/user.schemas"

const createUserService = async (
  userData: tUserRequest
): Promise<tUserResponse> => {
  userData.password = await bcrypt.hash(userData.password, 10)
  const insertQuery = format(
    `
      INSERT INTO
        users (%I)
      VALUES
        (%L)
      RETURNING *;
    `, 
    Object.keys(userData), 
    Object.values(userData)
  )
  const queryResult: QueryResult<tUser> = await client.query(insertQuery)
  const newUser: tUserResponse = responseUserSchema.parse(queryResult.rows[0])
  return newUser
}

export default createUserService