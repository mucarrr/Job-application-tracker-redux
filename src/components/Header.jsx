import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
       <div className='logo'>
       <img src="/logo.png" alt="logo" />
       <h2>Job Application Tracker</h2>
       </div>
       <nav>
        <NavLink to="/">Applications</NavLink>
        <NavLink to="/job/create">New Application</NavLink>
       </nav>
    </div>
  )
}

export default Header