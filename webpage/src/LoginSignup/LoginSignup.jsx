import React, { useState } from 'react'
import './LoginSignup.css'

import user_logo from '../assets/user_logo.png'
import email_logo from '../assets/email_logo.png'
import password_logo from '../assets/password_logo.png'
const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  return (
    <div className='container'>
        <div className="switch-action-container">
            {action === "Login" ? (
                <div className="switch-action-info">
                    Don't have an account? <span className="switch-action-link" onClick={() => setAction("Sign Up")}>Sign Up</span>
                </div>
            ) : (
                <div className="switch-action-info">
                    Already have an account? <span className="switch-action-link" onClick={() => setAction("Login")}>Login</span>
                </div>
            )}
        </div>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_logo} alt="User" />
                <input type="text" />
            </div>
        </div>
        {action === "Sign Up" && (
        <div className="inputs">
            <div className="input">
                <img src={email_logo} alt="Email" />
                <input type="email" />
            </div>
        </div>
        )}
        <div className="inputs">
            <div className="input">
                <img src={password_logo} alt="Password" />
                <input type="password" />
            </div>
        </div>
        <div className="ok-btn-container">
            <button className="ok-btn">{action}</button>
        </div>
    </div>
  )
}

export default LoginSignup
