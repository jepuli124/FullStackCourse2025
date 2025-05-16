import Jwt from "jsonwebtoken"
import { User } from "../models/User"

export const protect = async (req: any, res: any, next:any) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = Jwt.verify(token, process.env.SECRET as string)

      // Get user from the token
      req.user = await User.findById(decoded).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}
