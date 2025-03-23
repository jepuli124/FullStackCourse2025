import {Request, Response, Router} from "express"
import path from "path";
import {IWorldMap, WorldMap, ILocationMap, LocationMap} from './models/Maps'
import {IImage, Image} from './models/Image'
import {ITag, Tag} from './models/Tags'
import upload from '../middleware/multer-config'
import { validateToken, validateTokenAdmin } from '../middleware/validate-config'
import { IUser, User } from "./models/User";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const router: Router = Router()

function setup(){
    console.log("router is up and running")
    };
async function saveTagIfNew(tag: ITag){
    if(await Tag.findOne({name: tag.name}) == null){ // if tag doesn't exist yet, save it as new, findOne function returns null if nothing was found. find function would return a empty list. this is more optimal.
        await tag.save()
    }
    };

router.get('/api/worldMaps/name/:name', async (req: any, res: any) =>{  // return specific world map by name
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
    });

router.get('/api/locationMaps/name/:name', async (req: any, res: any) =>{  // return specific location map by name
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
    });

router.get('/api/worldMaps/id/:id', async (req: any, res: any) =>{  // return specific world map by id
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
    });

router.get('/api/locationMaps/id/:id', async (req: any, res: any) =>{  // return specific location map by id
    try {
        const locationMap: ILocationMap | null = await LocationMap.findOne({id: req.params["id"]})
        if(locationMap?.imageId !== undefined){
            const mapImage = await Image.findOne({id: locationMap?.imageId})

            return res.status(200).json({locationMap: locationMap, mapImage: mapImage})
        }

        return res.status(200).json({locationMap: locationMap, mapImage: undefined})
    } catch (error: any) {
        console.log(`Error while fetching a location map by id: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    });

router.get('/api/worldMaps', async (req: any, res: any) =>{ // returns all world maps without images 
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
    
    });

router.get('/api/locationMaps', async (req: any, res: any) =>{ // returns all location maps without images 
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
    });

router.get('/api/worldMaps/tags', async (req: any, res: any) =>{ // returns all world maps with any tag given without images 
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
    
    });

router.get('/api/locationMaps/tags', async (req: any, res: any) =>{ // returns all world maps with any tag given without images 
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
    
    });

router.get('/api/tags', async (req: any, res: any) => { // returns all tags in a list
    try {
        
        const tags = await Tag.find()
        res.status(200).json(tags) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    });

router.post('/api/uploadLocationMap', upload.single("image"), async (req: any, res: any) => { //upload a location map
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
                console.log("got Here")
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
        res.status(201).json({msg: `successful operation in upload location map`}) // calling it a day :)

    } catch (error: any) {
        console.log(`Error while uploading location map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    });

router.post('/api/uploadWorldMap', upload.single("image"), async (req: any, res: any) => { // upload a world map
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
            console.log(req.body.tagcheckbox[0][0])
            if(req.body.tagcheckbox[0][0] !== undefined){
                for (let index = 0; index < req.body.tagcheckbox.length; index++) {
                    const newTag: ITag = new Tag({
                        name: req.body.tagcheckbox[index]
                    })
                    newMap.tags.push(newTag);
                }
            } else {
                console.log("got Here")
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
        res.status(201).json({msg: `successful operation in upload world map`})

    } catch (error: any) {
        console.log(`Error while uploading world map: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    });

router.get('/api/validateTokenAdmin', validateTokenAdmin, async (req: Request, res: Response): Promise<void> => {  // get session token validated to bypass login faster (admin edition)

    try {
        res.status(200).json({message: "proceed"})
    } catch (error: any) {
        console.log(`Error while get a card: ${error}`)
        res.status(500).json({message: "Internal server error"})
    }
    return
    });

router.post('/api/register', async (req: Request, res: Response): Promise<void> => {  // register

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
    })

router.post('/api/login', async (req: Request, res: Response): Promise<void> => {  // login

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
});

setup()

export default router