import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document{
    name: string,
    email: string,
    password: string
}

let users: Schema = new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
}, {
    timestamps: true
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("users", users)

export {IUser, User, users }