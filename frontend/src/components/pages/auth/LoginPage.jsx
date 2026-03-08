import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
      <div>
    
      </div>
    </div>
  )
}

export default LoginPage