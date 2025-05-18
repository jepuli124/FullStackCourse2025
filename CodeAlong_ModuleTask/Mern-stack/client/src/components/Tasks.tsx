import React from 'react'
import Itask from '../interfaces/Itask'
import { Task } from './Task'

interface incomingParams {
    incomingTasks: Itask[]
    deleteTask?: (index: number) => void  
}

const Tasks: React.FC<incomingParams> = ({ incomingTasks, deleteTask }) => {

    
  return (
    <div className='container'>
        {incomingTasks.map((task, index) => (
            <div key={index}>
                <Task task={task} deleteTask={() => { if(deleteTask) deleteTask(index) }} ></Task>
            </div>
        ))}
    </div>
  )
}

export default Tasks