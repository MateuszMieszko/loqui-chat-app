import React, { useState } from 'react'
import './LoginSignup.css'

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

    const handleClick = async () => {
        if (username.length < 5) {
            alert("Username must be at least 5 characters long");
            return;
        }
        if (password.length < 5) {
            alert("Password must be at least 5 characters long");
            return;
        }
        if (action === "Sign Up") {
            if(email.length < 5) {
                alert("Email is not valid");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                const response = await fetch("http://localhost:8000/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                if (response.ok) {
                    alert("Registration successful!");
                    setAction("Login"); // Switch to login after registration
                    return;
                } else {
                    const data = await response.json();
                    alert(data.message || "Registration error");
                }
            } catch {
                alert("Connection error with server");
            }
            return;
        }
        // LOGIN
        try {
            const response = await fetch("http://localhost:8000/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.login) {
                alert("Logged in successfully");
                window.location.href = "https://youtube.com";
            } else {
                alert("Login failed");
            }
        } catch {
            alert("Login failed");
        }
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

        <div className="ok-btn-container" onClick={handleClick}>
            <button className="ok-btn" >
                {action}
            </button>
        </div>
    </div>
  )
}

export default LoginSignup
