import {Request, Response, Router} from "express"
import path from "path";
import { IUser, User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const validateAdmin = async (req: Request, res: Response): Promise<void> => {  // get session token validated to bypass login faster (admin edition)

    try {
        res.status(200).json({message: "proceed"})
    } catch (error: any) {
        console.log(`Error while get a card: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}

export const register = async (req: Request, res: Response): Promise<void> => {  // register
    try {
        const listOfUsers = await User.find()
        for (let index = 0; index < listOfUsers.length; index++) { // checking that username is unique, not necessary but I thought it was a nice feature 
            if (req.body.name == listOfUsers[index].username){
                console.log("Username already registered", req.body.name, listOfUsers[index].username)
                res.status(403).json({msg: "Username already registered"})
                return
            };
        }
        
        const salt: string = bcrypt.genSaltSync(10, 'b'); // password encryption process, taken from course's source codes. 
        let password: string = bcrypt.hashSync(req.body.password, salt);

        let admin: boolean = false
        if(req.body.isAdmin){ //req.body.isAdmin is either "on" or null, so this changes it to boolean
            admin = true
        }

        const newUser = new User ({
            username: req.body.name,
            password: password,
            admin: admin
        })
        await newUser.save()

        const payLoadInfo: IUser | null = await User.findOne({username: req.body.name}) //need to fetch the new user to take the id to the JWTplayload 
        if(!payLoadInfo){
            
            res.status(500).json({message: "error in registry, refetching the saved user"})
            return
        }
        const payload: JwtPayload = { // creating the payload
            username: payLoadInfo.username,
            userId: payLoadInfo._id,
            isAdmin: admin,
            message: "I dont know what should be stored here, so I wrote this" // not necessary, just funi
        }
        const token: string = jwt.sign(payload, process.env.SECRET as string, { expiresIn: "100m"}) // creation of the token

        res.status(200).json({messsage: "registery successful", token: token})
    } catch (error: any) {
        console.log(`Error in registery: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}
    
export const login = async (req: Request, res: Response): Promise<void> => {  // login

    try {
        const listOfUsers: IUser[] = await User.find()

        for (let index = 0; index < listOfUsers.length; index++) { // checking if that user exist and has the password equal the saved one.
            if (req.body.name == listOfUsers[index].username && bcrypt.compareSync(req.body.password, listOfUsers[index].password)){
                const payload: JwtPayload = { // creating token payload
                    username: listOfUsers[index].username,
                    userId: listOfUsers[index]._id,
                    isAdmin: listOfUsers[index].admin,
                    message: "I dont know what should be stored here, so I wrote this"
                }
                const token: string = jwt.sign(payload, process.env.SECRET as string, { expiresIn: "100m"})
                res.status(200).json({message: "Login succsesful", token: token})
                return //apparently crusial for preventing http_headers error
            };
        }

        res.status(403).json({message: `login failed `})
    } catch (error: any) {
        console.log(`Error while login: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
}