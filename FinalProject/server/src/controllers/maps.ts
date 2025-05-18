import {IWorldMap, WorldMap, ILocationMap, LocationMap} from '../models/Maps'
import {IImage, Image} from '../models/Image'
import {ITag, Tag} from '../models/Tags'
import { IMarker, Marker } from '../models/Marker'



async function saveTagIfNew(tag: ITag){
    if(tag.name.trim() !== "" && await Tag.findOne({name: tag.name}) == null){ // if tag doesn't exist yet, save it as new, findOne function returns null if nothing was found. find function would return a empty list. this is more optimal.
        await tag.save()
    }
};

export const worldMapByName = async (req: any, res: any) =>{  // return specific world map by name
    try {
        const worldMap: IWorldMap | null = await WorldMap.findOne({name: req.params["name"]})
        if(worldMap?.imageId !== undefined){
            const mapImage = await Image.findOne({id: worldMap?.imageId})

            return res.status(200).json({worldMap: worldMap, mapImage: mapImage})
        }
        return res.status(200).json({worldMap: worldMap})
    } catch (error: any) {
        console.log(`Error while fetching a world map by name: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const locationMapByName = async (req: any, res: any) =>{  // return specific location map by name
    try {
        const locationMap: ILocationMap | null = await LocationMap.findOne({name: req.params["name"]})
        if(locationMap?.imageId !== undefined){
            const mapImage = await Image.findOne({id: locationMap?.imageId})

            return res.status(200).json({locationMap: locationMap, mapImage: mapImage})
        }
        return res.status(200).json({locationMap: locationMap})
    } catch (error: any) {
        console.log(`Error while fetching a location map by name: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const mapById = async (req: any, res: any) =>{  // return specific world map by id
    try {

        const worldMap: IWorldMap | null = await WorldMap.findById(req.params["id"])
        if(worldMap) {

            if(worldMap?.imageId !== undefined){
                const mapImage = await Image.findById(worldMap?.imageId)
                const markers = await Marker.find({mapThisBelongsTo: worldMap.id})
                return res.status(200).json({worldMap: worldMap, mapImage: mapImage?.path, markers: markers})
            }
     
            return res.status(200).json({worldMap: worldMap})
        } else {
            const locationMap: ILocationMap | null = await LocationMap.findById(req.params["id"])
            if(!locationMap){
                return res.status(404).json({message: "Map not found"})
            }
            if(locationMap?.imageId !== undefined){
                const mapImage = await Image.findById(locationMap?.imageId)
                const markers = await Marker.find({mapThisBelongsTo: locationMap.id})

                return res.status(200).json({locationMap: locationMap, mapImage: mapImage?.path, markers: markers})
            }
            
            return res.status(200).json({locationMap: locationMap, mapImage: undefined})
        }
        
    } catch (error: any) {
        console.log(`Error while fetching a world map by id: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const worldMapById = async (req: any, res: any) =>{  // return specific world map by id
    try {
        const worldMap: IWorldMap | null = await WorldMap.findById(req.params["id"])
        if(worldMap?.imageId !== undefined){
            const mapImage = await Image.findById(worldMap?.imageId)
            return res.status(200).json({worldMap: worldMap, mapImage: mapImage?.path})
        }
 
        return res.status(200).json({worldMap: worldMap})
    } catch (error: any) {
        console.log(`Error while fetching a world map by id: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const locationMapById = async (req: any, res: any) =>{  // return specific location map by id
    try {
        const locationMap: ILocationMap | null = await LocationMap.findOne({id: req.params["id"]})
        if(locationMap?.imageId !== undefined){
            const mapImage = await Image.findById(locationMap?.imageId)

            return res.status(200).json({locationMap: locationMap, mapImage: mapImage})
        }

        return res.status(200).json({locationMap: locationMap, mapImage: undefined})
    } catch (error: any) {
        console.log(`Error while fetching a location map by id: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

const addImagePathToMaps = async (maps: IWorldMap[] | ILocationMap[] ) =>{
    const returnMaps: {
        _id: string | undefined
        name: string
        description: string
        imageId: string | undefined
        campain: string
        tags: string[]}[] = []

    for (let index = 0; index < maps.length; index++) {
        const image: IImage | null = await Image.findById(maps[index].imageId);
        const tags: string[] = []
        maps[index].tags.forEach((tag) => {
            tags.push(tag.name)
        })
        returnMaps.push({_id: maps[index].id, name: maps[index].name, description: maps[index].description, imageId: image?.path, campain: maps[index].campain, tags: tags})
    }
    return returnMaps
}

export const worldMaps = async (req: any, res: any) =>{ // returns all world maps without images 
    try {
        const worldMaps: IWorldMap[] | null = await WorldMap.find()
        if (!worldMaps) {
            return res.status(404).json({message: "No world maps found"})
        }

        return res.status(200).json(await addImagePathToMaps(worldMaps))
    } catch (error: any) {
        console.log(`Error while fetching world maps: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    
}

export const locationMaps = async (req: any, res: any) =>{ // returns all location maps without images 
    try {
        const locationMaps: ILocationMap[] | null = await LocationMap.find()
        
        if (!locationMaps) {
            return res.status(404).json({message: "No location maps found"})
        }

        return res.status(200).json(await addImagePathToMaps(locationMaps))
    } catch (error: any) {
        console.log(`Error while fetching location maps: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

export const worldMapsWithoutImages = async (req: any, res: any) =>{ // returns all world maps without images 
    try {
        const worldMaps: IWorldMap[] | null = await WorldMap.find()
        
        if (!worldMaps) {
            return res.status(404).json({message: "No world maps found"})
        }

        return res.status(200).json(worldMaps)
    } catch (error: any) {
        console.log(`Error while fetching world maps: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    
}

export const locationMapsWithoutImages = async (req: any, res: any) =>{ // returns all location maps without images 
    try {
        const locationMaps: ILocationMap[] | null = await LocationMap.find()
        
        if (!locationMaps) {
            return res.status(404).json({message: "No location maps found"})
        }

        return res.status(200).json(locationMaps)
    } catch (error: any) {
        console.log(`Error while fetching location maps: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

export const worldMapByTag = async (req: any, res: any) =>{ // returns all world maps with any tag given without images 
    try {
        const worldMaps: IWorldMap[] | null = await WorldMap.find()
        let returnMaps: IWorldMap[] = []
        if (!worldMaps) {
            return res.status(404).json({message: "No world maps found"})
        }
        for (let index = 0; index < worldMaps.length; index++) { //beautiful and inefficient 3 for loop
            for (let index2 = 0; index2 < worldMaps[index].tags.length; index2++) {
                  for (let counter = 0; counter < req.body.tags.length; counter++) {
                    if(req.body.tags[counter] == worldMaps[index].tags[index2].name){
                        returnMaps.push(worldMaps[index])
                        break
                    }
                }
            }
        }

        return res.status(200).json(returnMaps)
    } catch (error: any) {
        console.log(`Error while fetching world maps by tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    
    }

export const locationMapByTag = async (req: any, res: any) =>{ // returns all world maps with any tag given without images 
    try {
        const locationMaps: ILocationMap[] | null = await LocationMap.find()
        let returnMaps: ILocationMap[] = []
        if (!locationMaps) {
            return res.status(404).json({message: "No world maps found"})
        }
        for (let index = 0; index < locationMaps.length; index++) { //beautiful and inefficient 3 for loop
            for (let index2 = 0; index2 < locationMaps[index].tags.length; index2++) {
                  for (let counter = 0; counter < req.body.tags.length; counter++) {
                    if(req.body.tags[counter] == locationMaps[index].tags[index2].name){
                        returnMaps.push(locationMaps[index])
                        break
                    }
                }
            }
        }
        return res.status(200).json(returnMaps)
    } catch (error: any) {
        console.log(`Error while fetching location maps by tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    
    }

export const uploadMap = async (req: any, res: any) => { //upload any map
    
    if (req.body.worldMap) {
        return uploadWorldMap(req, res)
    } else {
        return uploadLocationMap(req, res)
    }
    
}

export const uploadWorldMap = async (req: any, res: any) => { // upload a world map
    try {
        let newMap: IWorldMap = new WorldMap({  //building the map, adding information if it is given
            name: req.body.name,
            description: req.body.description, 
            tags: []
            })
        if(req.file){
            const newImage: IImage = new Image({
                filename: req.file.filename,
                path: `images/${req.file.filename}`
            })
            await newImage.save() 
            if (newImage.id !== undefined){
                newMap.imageId = newImage?.id //? causes the ts stop worrying if newImage.id is undefined
            }
        }
        if (req.body.campain !== undefined) {
            newMap.campain = req.body.campain
        }
        if(req.body.tagcheckbox !== undefined){
            if(req.body.tagcheckbox[0][0] !== undefined){
                for (let index = 0; index < req.body.tagcheckbox.length; index++) {
                    const newTag: ITag = new Tag({
                        name: req.body.tagcheckbox[index]
                    })
                    newMap.tags.push(newTag);
                }
            } else {
                const newTag: ITag = new Tag({
                    name: req.body.tagcheckbox
                })
                newMap.tags.push(newTag);
            }
            
        }

        let tagBuffer: string = ""; // the tags are parsed and seperated by whitespaces 
        for (let index = 0; index < req.body.tags.length; index++) {
            if(req.body.tags[index] == ' '){
                const newTag: ITag = new Tag({
                    name: tagBuffer
                })
                newMap.tags.push(newTag);
                saveTagIfNew(newTag)
                tagBuffer = ""
            } else {
                tagBuffer += req.body.tags[index];
            }
        }
        if(tagBuffer.length >= 1){ // if there is a tag in the buffer, this saves it  
            const newTag: ITag = new Tag({
                name: tagBuffer
            })
            newMap.tags.push(newTag);
            saveTagIfNew(newTag)
        }

        console.log("New world map", newMap)
        await newMap.save()
        return res.status(201).json({msg: `successful operation in upload world map`})

    } catch (error: any) {
        console.log(`Error while uploading world map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }

export const uploadLocationMap = async (req: any, res: any) => { //upload a location map
    try {
        let newMap: ILocationMap = new LocationMap({ //building the map, adding information if it is given
            name: req.body.name,
            description: req.body.description, 
            tags: []
            })
        if(req.file){
            const newImage: IImage = new Image({
                filename: req.file.filename,
                path: `images/${req.file.filename}`
            })
            await newImage.save() 
            if (newImage.id !== undefined){
                newMap.imageId = newImage?.id //? causes the ts stop worrying if newImage.id is undefined
            }
    
        } 
        if (req.body.worldMapIDThisBelongsTo !== undefined) {
            newMap.worldMapIDThisBelongsTo = req.body.worldMapIDThisBelongsTo
        }
        if (req.body.campain !== undefined) {
            newMap.campain = req.body.campain
        }
        if(req.body.tagcheckbox !== undefined){
            if(req.body.tagcheckboxHasMultiple == true){
                for (let index = 0; index < req.body.tagcheckbox.length; index++) {
                    const newTag: ITag = new Tag({
                        name: req.body.tagcheckbox[index]
                    })
                    newMap.tags.push(newTag);
                }
            } else {
                const newTag: ITag = new Tag({
                    name: req.body.tagcheckbox
                })
                newMap.tags.push(newTag);
            }
            
        }

        let tagBuffer: string = ""; // the tags are parsed and seperated by whitespaces 
        for (let index = 0; index < req.body.tags.length; index++) {
            if(req.body.tags[index] == ' '){
                const newTag: ITag = new Tag({
                    name: tagBuffer
                })
                newMap.tags.push(newTag);
                saveTagIfNew(newTag)
                tagBuffer = ""
            } else {
                tagBuffer += req.body.tags[index];
            }
        }
        if(tagBuffer.length >= 1){ // if there is a tag in the buffer, this saves it  
            const newTag: ITag = new Tag({
                name: tagBuffer
            })
            newMap.tags.push(newTag);
            saveTagIfNew(newTag)
        }
        
        console.log("New location map", newMap)
        await newMap.save()
        return res.status(201).json({msg: `successful operation in upload location map`}) // calling it a day :)

    } catch (error: any) {
        console.log(`Error while uploading location map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

