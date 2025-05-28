import { useEffect, useState, useRef, useCallback } from "react";
import MessagePlate from "./MessagePlate";
import axios from "axios";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import './Chat.css'

async function fetchMessages(chatUserId, token) {
    if(chatUserId === null) return [];
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

export default function Chat({ chatUserId, token, chatInputRef }) {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const loadMessages = useCallback(async () => {
        setError(null);
        try {
            const response = await fetchMessages(chatUserId, token);
            if (!response || !response.data) throw new Error("No response");
            const newMessages = response.data?.content || [];
            setMessages((prevMessages) => {
                const sameLength = prevMessages.length === newMessages.length;
                const sameContent = sameLength && prevMessages.every((msg, i) => msg.id === newMessages[i].id);
                return sameContent ? prevMessages : newMessages;
            });
        } catch (err) {
            setMessages([]);
            setError("Failed to load messages.");
        } finally {
            setLoading(false);
        }
    }, [chatUserId, token]);

    useEffect(() => {
        const load = async () => {
            await loadMessages();
            scrollToBottom();
        }
        load();
    }, [loadMessages]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            loadMessages();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [loadMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMessageSent = async () => {
        await loadMessages();
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    };

    return (
        <>
            <div className="chat-container">
                <ChatHeader
                    chatUserId={chatUserId}
                    token={token}
                />

                <div className="messages-container">

                    {chatUserId === null ? (
                        <p>Please select a user first</p>
                    ) : loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p style={{ color: "var(--main)" }}>{error}</p>
                    ) : messages.length === 0 ? (
                        <p>No messages yet.</p>
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
                    chatInputRef={chatInputRef}
                />
            </div>
        </>
    );
}
