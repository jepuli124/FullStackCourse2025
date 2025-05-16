import { Goal, IGoal } from "../models/Goal"

export const getGoals = async (req: any, res: any) => {
    try {
        
        const goals = await Goal.find()
        if(!goals){
            return res.status(404).json({msg: "Goals not found"})
        }
        return res.status(200).json(goals) 

    } catch (error: any) {
        console.log(`Error while fetching goals: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const posttGoal = async (req: any, res: any) => {
    try {
        
        const goal: IGoal = new Goal ({
            name: req.body.name
        }) 
        
        await goal.save()

        return res.status(200).json({msg: "Goal added"}) 

    } catch (error: any) {
        console.log(`Error while fetching goals: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const updateGoal = async (req: any, res: any) => {
    try {
        
        const goal = await Goal.findById(req.params.id)
        if(!goal){
            return res.status(404).json({msg: "Goals not found"})
        }
        const uGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true} )

        return res.status(200).json(uGoal) 

    } catch (error: any) {
        console.log(`Error while fetching goals: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteGoal = async (req: any, res: any) => {
    try {
 
        await Goal.deleteOne({id: req.params.id})
        return res.status(200).json({msg: "Goal deleted"}) 

    } catch (error: any) {
        console.log(`Error while fetching goals: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
}

