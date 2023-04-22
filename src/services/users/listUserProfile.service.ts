import { QueryConfig, QueryResult } from "pg";
import { tUserResponse } from "../../interfaces/users.interfaces";

import { client } from "../../database";

const listUserProfileService = async (userId: number): Promise<tUserResponse> => {
  const searchQuery: string = `
    SELECT
      "id", "name", "email", "admin", "active"
    FROM
      users
    WHERE
      id = $1;
  `
  const queryConfig: QueryConfig = { text: searchQuery, values: [userId]}
  const queryResult: QueryResult<tUserResponse> = await client.query(queryConfig)
  const user = queryResult.rows[0]
  return user
}

export default listUserProfileService