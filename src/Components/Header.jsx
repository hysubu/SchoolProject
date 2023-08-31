import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='nav'>
        <Link to="/addclass">Add Book</Link>
        <Link to="/">Regestration</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">{ localStorage.getItem("token") ? "UpdateProfile":""}</Link>
    </div>
  )
}

export default Header