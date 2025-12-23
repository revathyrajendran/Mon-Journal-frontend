import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Mydiary from './Pages/Mydiary'
import Write from './Pages/Write'
import Pnf from './Pages/Pnf'
import Footer from './Components/Footer'
import { useEffect, useState } from 'react'
import Preloader from './Pages/Preloader'

function App() {
  //state for preloader, initially true, then after sometime it will become false
  const[preLoader,setPreLoader]=useState(true)

  //to set timer on how much time preloader should be seen
  useEffect(()=>{
    //it will stay active for 3s
     setTimeout(()=>{
         setPreLoader(false)
     },3000)
  })
  return (
    <>
   
    <Routes>
      <Route path='/' element={preLoader?<Preloader/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/mydiary' element={<Mydiary/>}/>
      <Route path='/write' element={preLoader?<Preloader/>:<Write/>}/>
      <Route path='/*' element={<Pnf/>}/>
    </Routes> 
    <Footer/>
    </>
  )
}

export default App
