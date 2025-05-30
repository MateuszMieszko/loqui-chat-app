import UsersList from "../UsersList";
import Chat from "../Chat";
import "./Messages.css"
import "../Chat.css"
import "../Users.css"
import { Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { isLoggedIn } from "../../utils/isLoggedIn";
import ChatTests from "../ChatTests";
import AccountPlate from "../AccountPlate";
import LanguageButton from "../LanguageButton";

export default function Messages() {
    const [authorized, setAuthorized] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
    }, []);

    const chatInputRef = useRef(null);

    const [chatUserId, setChatUserId] = useState(null);
    function handleUserClick(id) {
        chatInputRef.current.focus();
        setChatUserId(id);
    }

    // load from localStorage
    useEffect(() => {
        const lastMessaged = localStorage.getItem('lastMessaged');
        if (lastMessaged) {
            setChatUserId(lastMessaged);
        }
    }, []);

    useEffect(() => {
        if(chatUserId) localStorage.setItem('lastMessaged', chatUserId);
    }, [chatUserId]);

    if (authorized === null) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;

    return (
        <>
        <div className="messagesPage">
            <div className="sidebar">
                <UsersList onClick={handleUserClick}/>
                <AccountPlate username={authorized.username} />
            </div>
            <LanguageButton />
            <Chat
                key={1}
                chatUserId={chatUserId}
                token={localStorage.getItem('token')}
                chatInputRef={chatInputRef}
            />
            {/* <ChatTests /> */}
        </div>
        </>
    )
}