import { useEffect, useState } from "react";
import axios from "axios";

export default function MessageInput({ chatUserId, onMessageSent, token, chatInputRef }) {
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        const trimmed = message.trim();
        if (!trimmed) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, {
                receiver_id: chatUserId,
                content: trimmed,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("");

            if (onMessageSent) onMessageSent(response);
        }
        catch (err) {
            console.error("Error occured durign sending message:", err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    }

    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");
    
    useEffect(() => {
        const onStorage = () => setLang(localStorage.getItem("lang") || "pl");
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const messages = {
        pl: { 
            writeMessage: "Napisz wiadomość...",
            send: "Wyślij"
        },
        en: {
            writeMessage: "write a message...",
            send: "Send"
        }
    };
    return (
        <>
            <div className="message-input">
                <input
                    type="text"
                    placeholder= {messages[lang].writeMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    ref={chatInputRef}
                />
                <button onClick={handleSend}>
                    {messages[lang].send}
                </button>
            </div>
        </>
    )
}