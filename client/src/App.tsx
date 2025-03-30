import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import MyLogin from './components/MyLogin'
import Addmap from './components/Addmap'
import Header from './components/Header'
import MainMenu from './components/MainMenu'
import MapWrapperZPP from './components/MapWrapperZPP'

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element= {
            <MainMenu />
          }/>
          <Route path="/login/" element= {
            <MyLogin />
          }/>
          <Route path="/cards/" element= {
             <p> 5 / 5 </p> 
          }/>
          <Route path="/addMap/" element= {
             <Addmap /> 
          }/>
          <Route path="/browseMaps/" element= {
             <p> 5 / 5 </p> 
          }/>
          <Route path="/map/:id" element= {
             <MapWrapperZPP />
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

