import {Request, Response, NextFunction} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

interface CustomRequest extends Request {
    user?: JwtPayload
}

export const validateToken = (req: any, res: any, next: NextFunction) => { // given as source code from the course
    const token: string | undefined = req.header('authorization')?.split(" ")[1] //reading the token from authorization
    if(!token) return res.status(401).json({message: "Missing token"})

    try {
        const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload //verification
        req.body.user = verified
        next()

    } catch (error: any) {
        res.status(401).json({message: "Auth error token"})
    }
}


export const validateTokenAdmin = (req: any, res: any, next: NextFunction) => { // admin authentication. parses the token and reads the isAdmin value. 
    const token: string | undefined = req.header('authorization')?.split(" ")[1]

    if(!token) return res.status(401).json({message: "Missing token"})
    
    try {
        const arrayToken = token.split('.'); //https://medium.com/@feldjesus/how-to-decode-a-jwt-token-175305335024 
        const tokenPayload = JSON.parse(atob(arrayToken[1])); // parse process of the token
        if(tokenPayload.isAdmin !== true){
            return res.status(403).json({message: "Access denied."})
        }
        const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        req.body.user = verified
        next()

    } catch (error: any) {
        res.status(401).json({message: "Missing token"})
    }
}