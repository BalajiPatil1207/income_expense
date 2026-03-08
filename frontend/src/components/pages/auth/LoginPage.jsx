import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>LoginPage
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  )
}

export default LoginPage