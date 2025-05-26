import { useEffect, useState, useRef } from "react";
import MessagePlate from "./MessagePlate";
import axios from "axios";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import './Chat.css'

async function fetchMessages(chatUserId, token) {
    try {
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

export default function Chat({ chatUserId, token }) {
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // zamiast auto może być smooth
    };

    const loadMessages = async () => {
        const response = await fetchMessages(chatUserId, token);
        setMessages(response.data["content"]);
    }

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMessageSent = async (response) => {
        await loadMessages();
    };

    return (
        <>
            <div className="chat-container">
                <ChatHeader
                    chatUserId={chatUserId}
                    token={token}
                />

                <div className="messages-container">

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

                    <div ref={messagesEndRef} />
                </div>

                <MessageInput
                    chatUserId={chatUserId}
                    onMessageSent={handleMessageSent}
                    token={token}
                />
            </div>
        </>
    );
}