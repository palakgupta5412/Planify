import { useState } from 'react'
import Home from './pages/Home'
import Button from './components/Button'
import { Route } from 'react-router-dom'
import Routing from './utils/Routing'
import Navbar from './components/Navbar.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {
  
  return (
      <div className={`relative text-[#FAE5D8] font-${"pt-sans-regular"} bg-fixed backdrop-blur-3xl bg-gradient-to-b from-[#522959] via-[#824D69] to-[#180018] flex flex-col`}>
        <Navbar />
        <Routing />
      </div>
    
  )
}

export default App
