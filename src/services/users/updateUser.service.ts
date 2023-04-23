import format from "pg-format"
import { tUser, tUserResponse, tUserUpdateRequest } from "../../interfaces/users.interfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const updateUserService = async (
    userId: number,
    loggedUserId: number,
    isAdmin: boolean,
    userData: tUserUpdateRequest
  ): Promise<tUserResponse> => {
  let updateQuery: string = format(
    `
      UPDATE 
        users 
      SET
        (%I) = ROW (%L)
      WHERE 
        id = $1
    `,
    Object.keys(userData),
    Object.values(userData)
  )
  if (!isAdmin) {
    updateQuery += format(` AND id = %L`, loggedUserId)
  }
  updateQuery += ` RETURNING *;`
  
  const queryConfig: QueryConfig = { text: updateQuery, values: [userId] }
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  const updatedUser: tUserResponse = responseUserSchema.parse(queryResult.rows[0])
  return updatedUser
}

export default updateUserService