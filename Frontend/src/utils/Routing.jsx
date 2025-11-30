import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from '../pages/Add'
import Home from '../pages/Home'
const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
    </Routes>
  )
}

export default Routing