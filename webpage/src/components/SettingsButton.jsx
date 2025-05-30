import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SettingsButton() {
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");

    const handleClick = () => {
        navigate('/settings')
    }
    useEffect(() => {
        const onStorage = () => setLang(localStorage.getItem("lang") || "pl");
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const messages = {
        pl: { setting: "Ustawienia" },
        en: { setting: "Settings" }
    };
    return (
        <button onClick={handleClick}>
           {messages[lang].setting}
        </button>
    );
}