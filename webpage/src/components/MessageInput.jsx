import { useState } from "react"
import axios from "axios";

export default function MessageInput({ chatUserId, onMessageSent, token, chatInputRef }) {
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        const trimmed = message.trim();
        if (!trimmed) return;

        try {
            const response = await axios.post("http://localhost:8000/api/messages", {
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

    return (
        <>
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Napisz wiadomość..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    ref={chatInputRef}
                />
                <button onClick={handleSend}>Wyślij</button>
            </div>
        </>
    )
}