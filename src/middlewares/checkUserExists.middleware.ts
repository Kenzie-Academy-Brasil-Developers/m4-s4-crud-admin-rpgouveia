import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { tUser } from "../interfaces/users.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const checkUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = Number(request.params.id)
  const searchQuery = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `
  const queryConfig: QueryConfig = { text: searchQuery, values: [userId] }
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  const user = queryResult.rows[0]

  if (queryResult.rowCount === 0) {
    throw new AppError('User not found', 404)
  }

  response.locals.user = user
  return next()
}

export default checkUserExistsMiddleware