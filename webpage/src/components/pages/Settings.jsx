import { useState, useEffect } from 'react';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import './Settings.css';
import axios from 'axios';
import { checkCredentials } from '../../utils/checkCredentials';
import LanguageButton from '../LanguageButton';

export default function Settings() {
    const navigate = useNavigate();

    const [newUsername_u, setNewUsername_u] = useState(null);
    const [password_u, setPassword_u] = useState(null);
    const [status_u, setStatus_u] = useState(null);

    const [oldPassword_p, setOldPassword_p] = useState(null);
    const [newPassword_p, setNewPassword_p] = useState(null);
    const [confirmNewPassword_p, setConfirmNewPassword_p] = useState(null);
    const [status_p, setStatus_p] = useState(null);

    const [password_d, setPassword_d] = useState(null);
    const [status_d, setStatus_d] = useState(null);

    const [username, setUsername] = useState(null);
    const [authorized, setAuthorized] = useState(null);

    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");
    useEffect(() => {
        const onStorage = () => setLang(localStorage.getItem("lang") || "pl");
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const messages = {
        pl: { 
            uidiot: "Uzupełnij wszystkie pola.",
            invalidPassword: "Nieprawidłowe hasło.",
            noMachingPasswords: "Hasła nie pasują do siebie.",
            changeUsernameSuccess: "Nazwa użytkownika została zmieniona.",
            changePasswordSuccess: "Hasło zostało zmienione.",
            deleteAccountSuccess: "Konto zostało usunięte.",
            deleteAccountError: "Nie udało się usunąć konta.",
            conectionFailed: "Nie udało się połączyć z serwerem.",

            backToHome: "Powrót do strony głównej",
            changeUsername: "Zmień nazwę użytkownika",
            newUsername: "Nowa nazwa użytkownika",
            givePassword: "Podaj hasło",

            changePassword: "Zmień hasło",
            deleteAccount: "Usuń konto",
            passwordChanger: "Zmiana hasła",
            oldPassword: "Stare hasło",
            newPassword: "Nowe hasło",
            confirmNewPassword: "Potwierdź nowe hasło",
            confirmNewPasswordPlaceholder: "Potwierdź nowe hasło...",
            deleteAccount: "Usuń konto",
            passwordPrompt: "Podaj hasło",
            deleteAccountHeader: "Usuń konto"
        },
        en: { 
            uidiot: "Fill in all fields.", 
            invalidPassword: "Invalid password.",
            noMachingPasswords: "Passwords do not match.",
            changeUsernameSuccess: "Username has been changed.",
            changePasswordSuccess: "Password has been changed.",
            deleteAccountSuccess: "Account has been deleted.",  
            deleteAccountError: "Failed to delete account.",
            conectionFailed: "Failed to connect to the server.",

            backToHome: "Back to home page",
            changeUsername: "Change username",
            newUsername: "New username",
            givePassword: "Enter password",

            changePassword: "Change password",
            deleteAccount: "Delete account",
            passwordChanger: "Change password",
            oldPassword: "Old password",
            newPassword: "New password",
            confirmNewPassword: "Confirm new password",
            confirmNewPasswordPlaceholder: "Confirm new password...",
            passwordPrompt: "Enter password",
            deleteAccountHeader: "Delete account"
        }
    };
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
    }, []);
    useEffect(() => {
        if (authorized) setUsername(authorized.username);
    }, [authorized])
    if (authorized === null) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;
    const token = localStorage.getItem('token');

    const handleChangeUsername = async () => {
        setStatus_u('');
        if (!newUsername_u || !password_u) {
            setStatus_u(messages[lang].uidiot);
            return;
        }
        try {
            const login = await checkCredentials(username, password_u);
            if (!login) {
                setStatus_u(messages[lang].invalidPassword);
                return;
            }

            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users`, {
                username: newUsername_u
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStatus_u(messages[lang].changeUsernameSuccess);
            setUsername(newUsername_u);
        }
        catch (err) {
            if (err.response) {
                setStatus_u(`Błąd ${err.response.data.message || err.response.statusText}`);
            } else {
                setStatus_u(messages[lang].conectionFailed);
            }
        }
    };

    const handleChangePassword = async () => {
        setStatus_p('');
        if (!oldPassword_p || !newPassword_p || !confirmNewPassword_p) {
            setStatus_p(messages[lang].uidiot);
            return;
        }
        if (newPassword_p != confirmNewPassword_p) {
            setStatus_p(messages[lang].noMachingPasswords);
            return;
        }

        try {
            const login = await checkCredentials(username, oldPassword_p);
            if (!login) {
                setStatus_p(messages[lang].invalidPassword);
                return;
            }

            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users`, {
                password: newPassword_p
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStatus_p(messages[lang].changePasswordSuccess);
        }
        catch (err) {
            if (err.response) {
                setStatus_p(`Błąd ${err.response.data.message || err.response.statusText}`);
            } else {
                setStatus_p(messages[lang].conectionFailed);
            }
        }
    }

    const handleDeleteAccount = async () => {
        setStatus_d('');
        if (!password_d) {
            setStatus_d(messages[lang].uidiot);
            return;
        }

        try {
            const login = await checkCredentials(username, password_d);
            if (!login) {
                setStatus_d(messages[lang].invalidPassword);
                return;
            }

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate('/login');
        }
        catch (err) {
            if (err.response) {
                setStatus_d(`Błąd ${err.response.data.message || err.response.statusText}`);
            } else {
                setStatus_d(messages[lang].conectionFailed);
            }
        }
    }
    return (
        <>
            <LanguageButton />
            <div className='settings-container'>
                <Link to="/" className="back-home-button">{messages[lang].backToHome}</Link>
                <h1>{username}</h1>
                <div className='settings-section'>
                    <h2>{messages[lang].changeUsername}</h2>
                    <div className="settings-field">
                        <label>{messages[lang].newUsername}</label>
                        <input
                            placeholder={messages[lang].newUsername}
                            value={newUsername_u}
                            onChange={(e) => setNewUsername_u(e.target.value)}
                        />
                    </div>
                    <div className="settings-field">
                        <label>{messages[lang].givePassword}</label>
                        <input
                            placeholder={messages[lang].givePassword}
                            value={password_u}
                            onChange={(e) => setPassword_u(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button onClick={handleChangeUsername}>
                        {messages[lang].changeUsername}
                    </button>
                    {status_u && <p className="status-message">{status_u}</p>}
                </div>

                <div className='settings-section'>
                    <h2>{messages[lang].passwordChanger}</h2>
                    <div className="settings-field">
                        <label>{messages[lang].oldPassword}</label>
                        <input
                            placeholder={messages[lang].oldPassword}
                            value={oldPassword_p}
                            onChange={(e) => setOldPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="settings-field">
                        <label>{messages[lang].newPassword}</label>
                        <input
                            placeholder={messages[lang].newPassword}
                            value={newPassword_p}
                            onChange={(e) => setNewPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="settings-field">
                        <label>{messages[lang].confirmNewPassword}</label>
                        <input
                            placeholder={messages[lang].confirmNewPasswordPlaceholder}
                            value={confirmNewPassword_p}
                            onChange={(e) => setConfirmNewPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button onClick={handleChangePassword}>
                        {messages[lang].changePassword}
                    </button>
                    {status_p && <p className="status-message">{status_p}</p>}
                </div>

                <div className='settings-section'>
                    <h2>{messages[lang].deleteAccountHeader}</h2>
                    <div className="settings-field">
                        <label>{messages[lang].passwordPrompt}</label>
                        <input
                            placeholder={messages[lang].passwordPrompt}
                            value={password_d}
                            onChange={(e) => setPassword_d(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button onClick={handleDeleteAccount}>
                        {messages[lang].deleteAccount}
                    </button>
                    {status_d && <p className="status-message">{status_d}</p>}
                </div>

            </div>
        </>
    );
}