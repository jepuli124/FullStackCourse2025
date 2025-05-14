import { Tag } from "../models/Tags"

export const tags = async (req: any, res: any) => { // returns all tags in a list
    try {
        
        const tags = await Tag.find()
        if(!tags){
            return res.status(404).json({msg: "Tags not found"})
        }
        return res.status(200).json(tags) 

    } catch (error: any) {
        console.log(`Error while fetching tags: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
    }