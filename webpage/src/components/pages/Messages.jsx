import UsersList from "../UsersList";
import Chat from "../Chat";
import "./Messages.css"
import "../Chat.css"
import "../Users.css"
import { Navigate } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/isLoggedIn";
import ChatTests from "../ChatTests";

export default function Messages() {
    const [authorized, setAuthorized] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
    }, []);
    if (authorized === null) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;
    const token = localStorage.getItem('token');

    const users = [ "Zuzol", "Tofik", "Mati", "Patryk", "Kuba"];

    return (
        <div className="messagesPage">
            <UsersList users={users} />
            <Chat
                key={1}
                chatUserId={2}
                token={token}
            />
            {/* <ChatTests /> */}
            <LogoutButton />
        </div>
    )
}