import { useEffect, useState } from "react";
import MessagePlate from "./MessagePlate";
import axios from "axios";

async function fetchMessages(chatUserId) {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGljZSIsImlhdCI6MTc0ODIzOTk2NCwiZXhwIjoxODM0NjM5OTY0fQ.vQ_28Mz3Qma6y0dyzE3eQiOiAFqnGjkmHMLin3qpI1A";
        const response = await axios.get(`http://localhost:8000/api/messages/${chatUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch (err) {
        console.error("Error during fetching messages:", err);
        return [];
    }
}

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const chatUserId = 2;

    useEffect(() => {
        const loadMessages = async () => {
            const response = await fetchMessages(chatUserId);
            setMessages(response.data["content"]);
        }
        loadMessages();
    }, []);

    return (
        <>
            <div className="chat-container">

                {messages.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    messages.map((msg) => (
                        <MessagePlate
                            key={msg.id}
                            incoming={msg.sender_id == chatUserId}
                            date={msg.created_at}
                        >
                            {msg.content}
                        </MessagePlate>
                    ))
                )}

            </div>
        </>
    );
}