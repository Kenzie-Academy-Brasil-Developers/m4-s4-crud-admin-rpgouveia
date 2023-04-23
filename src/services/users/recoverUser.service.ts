import { QueryConfig, QueryResult } from "pg"
import { tUser, tUserResponse } from "../../interfaces/users.interfaces"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const recoverUserService = async (userId: number): Promise<tUserResponse> => {
  const recoverQuery: string = `
    UPDATE users 
    SET active = TRUE 
    WHERE id = $1
    RETURNING *;
  `
  const queryConfig: QueryConfig = { text: recoverQuery, values: [userId]}
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  const recoveredUser: tUserResponse = responseUserSchema.parse(queryResult.rows[0])
  return recoveredUser
}

export default recoverUserService