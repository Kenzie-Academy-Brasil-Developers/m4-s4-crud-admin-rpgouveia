import format from "pg-format";
import { tUserRequest, tUserResponse } from "../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../database";

const createUserService = async (
  userData: tUserRequest
): Promise<tUserResponse> => {
  const searchQuery = format(
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
  const queryResult: QueryResult<tUserResponse> = await client.query(searchQuery)
  const newUser = queryResult.rows[0]
  return newUser
}

export default createUserService