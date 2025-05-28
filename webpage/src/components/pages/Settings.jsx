import { useState, useEffect } from 'react';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import './Settings.css';
import axios from 'axios';
import { checkCredentials } from '../../utils/checkCredentials';

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
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
        setUsername(null);
        if (authorized) setUsername(authorized.username);
    }, [authorized]);
    if (authorized === null) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;
    const token = localStorage.getItem('token');

    const handleChangeUsername = async () => {
        setStatus_u('');
        if (!newUsername_u || !password_u) {
            setStatus_u('Uzupełnij wszystkie pola.');
            return;
        }

        try {
            const login = await checkCredentials(username, password_u);
            if (!login) {
                setStatus_u('Nieprawidłowe hasło.');
                return;
            }

            const response = await axios.put('http://localhost:8000/api/users', {
                username: newUsername_u
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStatus_u('Nazwa użytkownika została zmieniona.');

            setUsername(newUsername_u);
        }
        catch (err) {
            if (err.response) {
                setStatus_u(`Błąd ${err.response.data.message || err.response.statusText}`);
            } else {
                setStatus_u('Nie udało się połączyć z serwerem.');
            }
        }
    };

    const handleChangePassword = async () => {
        setStatus_p('');
        if (!oldPassword_p || !newPassword_p || !confirmNewPassword_p) {
            setStatus_p('Uzupełnij wszystkie pola.');
            return;
        }
        if (newPassword_p != confirmNewPassword_p) {
            setStatus_p('Hasła się nie zgadzają.');
            return;
        }

        try {
            const login = await checkCredentials(username, oldPassword_p);
            if (!login) {
                setStatus_p('Nieprawidłowe hasło.');
                return;
            }

            const response = await axios.put('http://localhost:8000/api/users', {
                password: newPassword_p
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStatus_p('Hasło zostało zmienione.');
        }
        catch (err) {
            if (err.response) {
                setStatus_p(`Błąd ${err.response.data.message || err.response.statusText}`);
            } else {
                setStatus_p('Nie udało się połączyć z serwerem.');
            }
        }
    }

    const handleDeleteAccount = async () => {
        setStatus_d('');
        if (!password_d) {
            setStatus_d('Uzupełnij wszystkie pola.');
            return;
        }

        try {
            const login = await checkCredentials(username, password_d);
            if (!login) {
                setStatus_d('Nieprawidłowe hasło.');
                return;
            }

            const response = await axios.delete('http://localhost:8000/api/users', {
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
                setStatus_d('Nie udało się połączyć z serwerem.');
            }
        }
    }

    return (
        <>
            <div className='settings-container'>
                <Link to="/" className="back-home-button">Powrót do strony głównej</Link>
                <h1>{username}</h1>

                <div className='settings-section'>
                    <h2>zmiana nazwy konta</h2>
                    <div className="settings-field">
                        <label>Nowa nazwa użytkownika</label>
                        <input
                            placeholder='Nowa nazwa użytkownika...'
                            value={newUsername_u}
                            onChange={(e) => setNewUsername_u(e.target.value)}
                        />
                    </div>
                    <div className="settings-field">
                        <label>Podaj hasło</label>
                        <input
                            placeholder='Podaj hasło...'
                            value={password_u}
                            onChange={(e) => setPassword_u(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button
                        onClick={handleChangeUsername}
                    >
                        zmień nazwę
                    </button>
                    {status_u && <p className="status-message">{status_u}</p>}
                </div>

                <div className='settings-section'>
                    <h2>zmiana hasła</h2>
                    <div className="settings-field">
                        <label>Stare hasło</label>
                        <input
                            placeholder='Stare hasło...'
                            value={oldPassword_p}
                            onChange={(e) => setOldPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="settings-field">
                        <label>Nowe hasło</label>
                        <input
                            placeholder='Nowe hasło...'
                            value={newPassword_p}
                            onChange={(e) => setNewPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="settings-field">
                        <label>Potwierdź nowe hasło</label>
                        <input
                            placeholder='Potwierdź nowe hasło...'
                            value={confirmNewPassword_p}
                            onChange={(e) => setConfirmNewPassword_p(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button
                        onClick={handleChangePassword}
                    >
                        zmień hasło
                    </button>
                    {status_p && <p className="status-message">{status_p}</p>}
                </div>

                <div className='settings-section'>
                    <h2>usuń konto</h2>
                    <div className="settings-field">
                        <label>Podaj hasło</label>
                        <input
                            placeholder='Podaj hasło...'
                            value={password_d}
                            onChange={(e) => setPassword_d(e.target.value)}
                            type="password"
                        />
                    </div>
                    <button
                        onClick={handleDeleteAccount}
                    >
                        usuń konto
                    </button>
                    {status_d && <p className="status-message">{status_d}</p>}
                </div>

            </div>
        </>
    );
}