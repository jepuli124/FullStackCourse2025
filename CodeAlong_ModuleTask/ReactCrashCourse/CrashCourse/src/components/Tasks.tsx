import React, { useState } from 'react'
import Itask from '../interfaces/Itask'
import { Task } from './Task'

interface incomingParams {
    incomingTasks: Itask[]
}

const Tasks: React.FC<incomingParams> = ({ incomingTasks }) => {
    const [tasks, setTasks] = useState<Itask[]>(incomingTasks)
    const deleteTask = (delIndex: number) => {
        setTasks(tasks.filter((task, index) => index !== delIndex))
    }
  return (
    <div className='container'>
        {tasks.map((task, index) => (
            <div key={index}>
                <Task task={task} deleteTask={() => { deleteTask(index) }} ></Task>
            </div>
        ))}
    </div>
  )
}

export default Tasks