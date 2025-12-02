import React, { useState } from 'react'
import userAvatar from './assets/avatar.png'


const ProfileDropDown = () => {
    const [isopen,setisopen] = useState(false);
    const toggleDropDown = setisopen(!isopen);
  return (
    <div className='profile-dropdown'> 
      <button onClick={toggleDropDown}>
        <img src={userAvatar} alt="User Avatar" />
        {username||'Guest'}
      </button>
      <div className="dropdown-menu">
        <a href="#">Profile</a><a href="#">Orders</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileDropDown
