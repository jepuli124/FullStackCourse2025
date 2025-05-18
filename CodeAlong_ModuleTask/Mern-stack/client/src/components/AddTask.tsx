import React, { useState } from 'react'
import Itask from '../interfaces/Itask'

interface incomingParams {
    onSubmit?: (task: Itask) => void
}

const AddTask: React.FC<incomingParams> = ({onSubmit}) => {
    const [text, setText] = useState('')
  const [name, setName] = useState('')

  return (
    <div>
        <form className='add-form' onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            const task: Itask = {name: name, text: text}
            if(onSubmit) {
            onSubmit(task)
            }}}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Name</label>
        <input
          type='text'
          placeholder='Set name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
    </div>
  )
}

export default AddTask