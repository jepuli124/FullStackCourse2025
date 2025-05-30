// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Headerinatior'
import Button from './components/Button'
import Tasks from './components/Tasks'
import Itask from './interfaces/Itask'
import { useState } from 'react'
import AddTask from './components/AddTask'

function App() {
  const ogtask: Itask = {name: "this", text: "woah"}
  const [addTask, setAddtask] = useState<boolean>(false)
  const [tasks, setTasks] =  useState<Itask[]>([ogtask])
  
  const deleteTask = (delIndex: number) => {
        setTasks(tasks.filter((task, index) => index !== delIndex))
    }

  return (
    <>
      <div>
        <Header></Header>
        <h1>Hello world</h1>
        {addTask ? <AddTask onSubmit={(task: Itask) => {
          const tempTasks: Itask[] = [...tasks, task]
          setTasks(tempTasks)
          setAddtask(false)
          }}></AddTask> : <></> }
        <Button text='add task'  onClickParam={() => setAddtask(true)}></Button>
        <Tasks incomingTasks={tasks} deleteTask={(index) => deleteTask(index)}></Tasks>
      </div> 
      
    </>
  )
}

export default App
