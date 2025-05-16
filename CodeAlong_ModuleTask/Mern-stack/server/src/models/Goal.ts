import mongoose, {Document, Schema} from "mongoose";

interface IGoal extends Document{
    name: string,
    userId: string
}

let goals: Schema = new Schema ({
    name: {type: String, require: true},
    userId: {type: String, require: true}
})

const Goal: mongoose.Model<IGoal> = mongoose.model<IGoal>("goals", goals)

export {IGoal, Goal, goals}