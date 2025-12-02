import React from 'react'
import "./assets/style.css";
const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-left">
                <h3>savvy</h3>
                <p>your one stop shop for all your need</p>
            </div>
            <div className="footer-links">
                <a href="#">About us</a>
                <a href="#">Contact us</a>
                <a href="#">Terms of Services</a>
                <a href="#">Privace Policy</a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>c 2023salesSavvy.All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer
