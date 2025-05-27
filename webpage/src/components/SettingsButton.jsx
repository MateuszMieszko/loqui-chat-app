import { useNavigate } from "react-router-dom";

export default function SettingsButton() {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate('/settings')
    }

    return (
        <button
            onClick={handleClick}
        >
            Ustawienia
        </button>
    );
}