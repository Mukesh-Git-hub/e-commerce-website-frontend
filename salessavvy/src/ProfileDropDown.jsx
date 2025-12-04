import React, { useState } from "react";
import userAvatar from "./assets/avatar.png";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({ username = "Guest" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("User successfully logged out");
        navigate("/login");
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.log("Error during logout", error);
    }
  };

  const handleOrdersClick = () => {
    navigate("/orders");
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropDown} className="profile-button">
        <img src={userAvatar} alt="User Avatar" className="avatar" />
        {username || "Guest"}
      </button>

   
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <button onClick={handleOrdersClick}>Orders</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
