import mongoose, {Document, Schema} from "mongoose";

interface IMarker extends Document{
    name?: string
    x: number
    y: number
    color?: string
    symbol?: string
    mapThisBelongsTo?: string
    linkToAnotherMap?: string
    id?: string
}

let markers: Schema = new Schema ({
    name: {type: String, require: false},
    x: {type: Number, require: true},
    y: {type: Number, require: true},
    color: {type: String, require: false},
    symbol: {type: String, require: false},
    mapThisBelongsTo: {type: String, require: false},
    linkToAnotherMap: {type: String, require: false},

})

const Marker: mongoose.Model<IMarker> = mongoose.model<IMarker>("markers", markers)

export {IMarker, Marker}