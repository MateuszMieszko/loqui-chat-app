import React, { useState } from 'react'
import './LoginSignup.css'

// Zamiast importować obrazki, używamy ścieżek do public/
const user_logo = '/user_logo.png';
const email_logo = '/email_logo.png';
const password_logo = '/password_logo.png';

const LoginSignup = () => {

    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = () => {
        if (username.length < 3) {
            alert("Username must be at least 3 characters long");
            return;
        }
        if (password.length < 5) {
            alert("Username must be at least 3 characters long");
            return;
        }
        if (action === "Sign Up") {
            if(email.length < 5) {
                alert("Email does not exist");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
        }
        window.location.href = "https://youtube.com";
    };
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
                <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                />
            </div>
        </div>
        {action === "Sign Up" && (
        <div className="inputs">
            <div className="input">
                <img src={email_logo} alt="Email" />
                <input 
                type = "email" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />
            </div>
        </div>
        )}
        <div className="inputs">
            <div className="input">
                <img src={password_logo} alt="Password" />
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                />
            </div>
        </div>
        {action === "Sign Up" && (
        <div className="inputs">
            <div className="input">
                <img src={password_logo} alt="PasswordV2" />
                <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                required
                />
            </div>
        </div>
        )}
        {/* sprawdzanie czy dane sa poprawne*/}

        <div className="ok-btn-container" onClick={handleClick}>
            <button className="ok-btn" >
                {action}
            </button>
        </div>
    </div>
  )
}

export default LoginSignup
