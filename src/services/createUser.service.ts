import { iUser } from "../interfaces/users.interfaces";

const createUserService = async (userData: iUser): Promise<string> => {

  const helloWorld = 'Hello World!'

  return helloWorld
}

export default createUserService