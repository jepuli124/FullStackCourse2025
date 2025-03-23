import mongoose, {Document, Schema} from "mongoose";

interface ITag extends Document{
    name: string
}

let tags: Schema = new Schema ({
    name: {type: String, require: true}
})

const Tag: mongoose.Model<ITag> = mongoose.model<ITag>("tags", tags)

export {ITag, Tag, tags}