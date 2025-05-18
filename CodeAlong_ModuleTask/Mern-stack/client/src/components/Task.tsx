import React, { useState } from 'react'
import Itask from '../interfaces/Itask'
import Button from './Button'

interface incomingParams {
    task: Itask
    deleteTask?: () => void
}

export const Task: React.FC<incomingParams> = ({ task , deleteTask }) => {
    const [marked, setMarked] = useState<boolean>(false) 

  return (
    <div className={`task ${marked && 'reminder'}`} onDoubleClick={() => setMarked(!marked)}>
        {marked ? <></>: <></>}
        <h2>{task.name}</h2>
        <h3>{task.text}</h3>
        <Button text="Delete" onClickParam={() => {if(deleteTask) deleteTask()}}></Button>
    </div>
  )
}
