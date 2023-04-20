import { QueryResult } from "pg"
import { tUserResponse } from "../interfaces/users.interfaces"
import { client } from "../database"

const listUsersService = async (): Promise<Array<tUserResponse>> => {
  const searchQuery: string = `
    SELECT
      "id", "name" , "email" , "admin" , "active" 
    FROM
      users;
  `
  const queryResult: QueryResult<tUserResponse> = await client.query(searchQuery)
  const users = queryResult.rows
  return users
}

export default listUsersService