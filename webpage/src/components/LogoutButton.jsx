import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function LogoutButton() {
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");

    useEffect(() => {
        const onStorage = () => setLang(localStorage.getItem("lang") || "pl");
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const messages = {
        pl: { Logout: "Wyloguj się" },
        en: { Logout: "Log out" }
    };
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
        <button onClick={handleClick}>
            {messages[lang].Logout}
        </button>
    );
}