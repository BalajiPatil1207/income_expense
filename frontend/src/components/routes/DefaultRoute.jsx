import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/auth/Register'
import LoginPage from '../pages/auth/LoginPage'

const DefaultRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}

export default DefaultRoute