import { User } from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const getUsers = async (req: any, res: any) => {
    try {
        
        const users = await User.find()
        if(!users){
            return res.status(404).json({msg: "Users not found"})
        }
        return res.status(200).json(users) 

    } catch (error: any) {
        console.log(`Error while fetching users: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const register = async (req: any, res: any) => {
    try {
        
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(404).json({msg: "User info not ofund "})
        }

        const userExist = await User.findOne({email: req.body.email})

        if(userExist){
            return res.status(404).json({msg: "User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            hashedPassword
        })

        return res.status(200).json(user) 

    } catch (error: any) {
        console.log(`Error while fetching users: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req: any, res: any) => {
    try {
        
        if(!req.body.email || !req.body.password){
            return res.status(404).json({msg: "User info not ofund "})
        }

        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({msg: "User npt fpund"})
        }
        
        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.status(404).json({msg: "Login fialed"})
        }

        return res.status(200).json({token: generateToken(user.id)}) 

    } catch (error: any) {
        console.log(`Error while fetching users: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET as string, {
    expiresIn: '30d',
  })
}