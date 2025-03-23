import mongoose, {Document, Schema} from "mongoose";

interface IMarker extends Document{
    name: string
    x: number
    y: number
    mapThisBelongsTo: string
}

let markers: Schema = new Schema ({
    name: {type: String, require: true},
    x: {type: Number, require: true},
    y: {type: Number, require: true},
    mapThisBelongsTo: {type: String, require: true}
})

const Marker: mongoose.Model<IMarker> = mongoose.model<IMarker>("markers", markers)

export {IMarker, Marker}