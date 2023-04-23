import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { tUser } from "../interfaces/users.interfaces"
import { client } from "../database"
import { AppError } from "../error"

const checkUserActiveStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(request.params.id)
  const searchQuery: string = `SELECT active FROM users WHERE id = $1;`
  const queryConfig: QueryConfig = { text: searchQuery, values: [userId]}
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  const user: tUser = queryResult.rows[0]
  if (user.active === true) {
    throw new AppError('User already active', 400)
  }
  return next()
}

export default checkUserActiveStatus