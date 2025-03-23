import mongoose, {Document, Schema} from "mongoose";
import {ITag, tags} from "./Tags" ;

interface IWorldMap extends Document{
    name: string
    description: string
    imageId: String
    id?: String
    campain: string
    tags: ITag[]
}

interface ILocationMap extends Document{
    name: string
    description: string
    imageId: String
    worldMapIDThisBelongsTo: string
    campain: string
    tags: ITag[]
}

let worldMaps: Schema = new Schema ({
    name: {type: String, require: true},
    description: {type: String, require: true},
    imageId: {type: String, require: false},
    campain: {type: String, require: false},
    tags: {type: [tags], require: false}
})

let locationMaps: Schema = new Schema ({
    name: {type: String, require: true},
    description: {type: String, require: true},
    imageId: {type: String, require: false},
    worldMapIDThisBelongsTo: {type: String, require: false},
    campain: {type: String, require: false},
    tags: {type: [tags], require: false}
})

const WorldMap: mongoose.Model<IWorldMap> = mongoose.model<IWorldMap>("worldMaps", worldMaps)

const LocationMap: mongoose.Model<ILocationMap> = mongoose.model<ILocationMap>("locationMaps", locationMaps)


export {IWorldMap, WorldMap, ILocationMap, LocationMap}
