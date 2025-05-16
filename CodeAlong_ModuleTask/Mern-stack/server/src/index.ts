import {Request, Response, Router} from "express"
import path from "path";
import { deleteGoal, getGoals, posttGoal, updateGoal } from "./controllers/goalController";


const router: Router = Router()

function setup(){
    console.log("router is up and running")
    };


router.route('/goals/').get(getGoals).post(posttGoal)
router.route('/goals/:id').put(updateGoal).delete(deleteGoal)


setup()

export default router