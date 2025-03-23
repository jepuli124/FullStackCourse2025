import mongoose, {Date, Document, Schema} from "mongoose";

interface IUser extends Document{
    username: string
    password: string
    admin: boolean
}

let users: Schema = new Schema ({
    username: {type: String, require: true},
    password: {type: String, require: true},
    admin: {type: Boolean, require: true}
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("users", users)

export {IUser, User}