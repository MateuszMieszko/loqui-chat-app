import { useState, useEffect } from 'react';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { Navigate } from 'react-router-dom';

export default function Settings() {
    const [authorized, setAuthorized] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
    }, []);

    if (authorized === null) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;

    return (
        <>
            <h1>settings</h1>
        </>
    );
}