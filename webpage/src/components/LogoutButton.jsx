import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.setItem('token', '');
            navigate('/login');
        }
        catch (err) {
            console.error('Error occured during logging out:', err);
        }
    }

    return (
        <button
            onClick={handleClick}
        >
            Wyloguj się
        </button>
    );
}