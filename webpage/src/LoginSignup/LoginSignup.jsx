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
    const [lang, setLang] = useState("pl");

    const messages = {
        pl: {
            login: "Logowanie",
            signup: "Rejestracja",
            username: "Nazwa użytkownika",
            email: "E-mail",
            password: "Hasło",
            confirmPassword: "Powtórz hasło",
            loginBtn: "Zaloguj się",
            signupBtn: "Zarejestruj się",
            switchToSignup: "Nie masz konta? ",
            switchToSignupLink: "Zarejestruj się",
            switchToLogin: "Masz już konto? ",
            switchToLoginLink: "Zaloguj się",
            usernameShort: "Nazwa użytkownika musi mieć co najmniej 5 znaków",
            passwordShort: "Hasło musi mieć co najmniej 5 znaków",
            emailInvalid: "Nieprawidłowy adres e-mail",
            passwordsNoMatch: "Hasła nie są takie same",
            registrationSuccess: "Rejestracja zakończona sukcesem!",
            registrationError: "Błąd rejestracji",
            connectionError: "Błąd połączenia z serwerem",
            loginSuccess: "Zalogowano pomyślnie",
            wrongUsername: "Nieprawidłowa nazwa użytkownika",
            wrongPassword: "Nieprawidłowe hasło",
            loginFailed: "Logowanie nie powiodło się",
            takenUsername: "Nazwa użytkownika jest już zajęta"
        },
        en: {
            login: "Login",
            signup: "Sign Up",
            username: "Username",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm password",
            loginBtn: "Login",
            signupBtn: "Sign Up",
            switchToSignup: "Don't have an account? ",
            switchToSignupLink: "Sign Up",
            switchToLogin: "Already have an account? ",
            switchToLoginLink: "Login",
            usernameShort: "Username must be at least 5 characters long",
            passwordShort: "Password must be at least 5 characters long",
            emailInvalid: "Email is not valid",
            passwordsNoMatch: "Passwords do not match",
            registrationSuccess: "Registration successful!",
            registrationError: "Registration error",
            connectionError: "Connection error with server",
            loginSuccess: "Logged in successfully",
            wrongUsername: "Wrong username",
            wrongPassword: "Wrong password",
            loginFailed: "Login failed",
            takenUsername: "Username is already taken"
        }
    };

    const t = (key) => messages[lang][key];

    const handleClick = async () => {
        if (action === "Sign Up") {
            if (username.length < 5) {
                setError(t("usernameShort"));
                return;
            }
            if (password.length < 5) {
                setError(t("passwordShort"));
                return;
            }
            if(email.length < 5 || !email.includes("@")) {
                setError(t("emailInvalid"));
                return;
            }
            if (password !== confirmPassword) {
                setError(t("passwordsNoMatch"));
                return;
            }
            
          try {
                const response = await fetch("http://localhost:8000/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                if (response.ok) {
                    alert(t("registrationSuccess"));
                    setAction("Login");
                } else {
                    const data = await response.json();
                    setError(data.message || t("takenUsername"));
                }
            } catch {
                alert(t("connectionError"));
            }
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.login) {
                alert(t("loginSuccess"));
                window.location.href = "https://youtube.com";
            } else {
                if (data.message && data.message.includes("User does not exist")) {
                    setError(t("wrongUsername"));
                } else if (data.message && data.message.includes("Invalid password")) {
                    setError(t("wrongPassword"));
                } else {
                    setError(t("loginFailed"));
                }
            }
        } catch {
            setError(t("loginFailed"));
        }
    };
    return (
    <div className='container'>
        <div className='lang-switch-container'>
            <div className='lang-btn-container'>
                <button className={`lang-btn${lang === 'pl' ? ' active' : ''}`}
                    onClick={() => setLang('pl')}
                >PL</button>
                <button className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
                >EN</button>
            </div>
        </div>
        <div className="switch-action-container">
            {action === "Login" ? (
                <div className="switch-action-info">
                    {t("switchToSignup")}
                    <span className="switch-action-link" onClick={() => setAction("Sign Up")}>{t("switchToSignupLink")}</span>
                </div>
            ) : (
                <div className="switch-action-info">
                    {t("switchToLogin")}
                    <span className="switch-action-link" onClick={() => setAction("Login")}>{t("switchToLoginLink")}</span>
                </div>
            )}
        </div>
        <div className="header">
            <div className="text">{action === "Login" ? t("login") : t("signup")}</div>
            <div className="underline"></div>
        </div>
        {error && <div className="error">{error}</div>}
        <form onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
            <div className="inputs">
                <div className="input">
                    <img src={user_logo} alt="User" />
                    <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("username")}
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
                    placeholder={t("email")}
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
                    placeholder={t("password")}
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
                    placeholder={t("confirmPassword")}
                    required
                    />
                </div>
            </div>
            )}

            <div className="ok-btn-container">
                <button className="ok-btn">
                    {action === "Login" ? t("loginBtn") : t("signupBtn")}
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginSignup
