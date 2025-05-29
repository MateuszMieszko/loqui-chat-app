import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatHeader({ chatUserId, token }) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            if(chatUserId === null) return;
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${chatUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsername(response.data.user_data.username);
        };
        loadUserData();
    });

    return (
        <>
            <div className="chat-header">
                <p className="chat-header-username">{username}</p>
            </div>
        </>
    );
}