import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from '../pages/Add'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import Calendar from '../components/Calendar'
const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/add' element={<Add />} />
        <Route path='/calendar' element={<Calendar />} />
    </Routes>
  )
}

export default Routing