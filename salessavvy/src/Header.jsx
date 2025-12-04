import React from 'react'
import "./assets/style.css";
import ProfileDropDown from './ProfileDropDown';
import { CartIcon } from "./CartIcon";
import Logo from './Logo';

const Header = ({ cartCount = 0, username = "Guest" }) => {
  return (
    <header className="header">
        <div className="header-content">
            <Logo />

            <div className="header-actions">
                <CartIcon count={cartCount} />
                <ProfileDropDown username={username} />
            </div>
        </div>
    </header>
  );
};

export default Header;
