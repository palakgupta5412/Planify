import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from '../pages/Add'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import Calendar from '../components/Calendar'
import Gallery from '../components/Gallery'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRoute from '../components/ProtectedRoute'
import Images from '../components/Images'

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/explore' element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path='/gallery' element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path='/add' element={<ProtectedRoute><Add /></ProtectedRoute>} />
        <Route path='/add/:id' element={<ProtectedRoute><Add /></ProtectedRoute>} />
        <Route path='/calendar' element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/plan/:id' element={<ProtectedRoute><Images /></ProtectedRoute>} />
        <Route path='/images/:id' element={<ProtectedRoute><Images /></ProtectedRoute>} />
    </Routes>
  )
}

export default Routing