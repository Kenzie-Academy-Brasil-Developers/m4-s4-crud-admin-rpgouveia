import { NextFunction, Request, Response } from "express";
import { tEmail, tUser } from "../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const checkEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email }: tEmail = request.body
  const searchQuery = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;
  `
  const queryConfig: QueryConfig = { text: searchQuery, values: [email] }
  const queryResult: QueryResult<tUser> = await client.query(queryConfig)
  
  if (queryResult.rowCount !== 0) {
    throw new AppError('Email already registered', 409)
  }

  return next()
}

export default checkEmailExistsMiddleware