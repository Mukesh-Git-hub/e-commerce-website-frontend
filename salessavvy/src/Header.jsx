import React from 'react'
import "./assets/style.css";

const Header = () => {
  return (
    <header className="header">
        <div className="header-content">
            <Logo/>
            <div className='header-actions'>
                <CartIcon count={cartCount}/>
                <ProfileDropDown username={username}></ProfileDropDown>
            </div>
        </div>
    </header>
  )
}

export default Header
