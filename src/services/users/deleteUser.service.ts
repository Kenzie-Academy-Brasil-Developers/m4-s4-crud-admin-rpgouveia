import { QueryConfig } from "pg"
import { client } from "../../database"

const deleteUserService = async (
  userId: number
) => {
  const deleteQuery = `
    UPDATE users 
    SET active = FALSE 
    WHERE id = $1
  `
  const queryConfig: QueryConfig = { text: deleteQuery, values: [userId]}
  await client.query(queryConfig)
}

export default deleteUserService