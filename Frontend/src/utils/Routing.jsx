import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from '../pages/Add'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/add' element={<Add />} />
    </Routes>
  )
}

export default Routing