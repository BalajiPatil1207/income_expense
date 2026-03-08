import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from '../pages/auth/Register'
import LoginPage from '../pages/auth/LoginPage'
import Dashboard from '../pages/dashboard/Dashboard'

const DefaultRoute = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(()=>{
    if (token) {
      navigate("/dash")
    }else{
      navigate("/login")
    }
  },[token]);
  
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/dash'element={<Dashboard/>}/>
    </Routes>
  )
}

export default DefaultRoute