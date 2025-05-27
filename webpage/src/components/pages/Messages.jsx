import UsersList from "../UsersList";
import Chat from "../Chat";
import "./Messages.css"
import "../Chat.css"
import "../Users.css"
import { Navigate } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useEffect, useState, useCallback, useRef } from "react";
import { isLoggedIn } from "../../utils/isLoggedIn";
import ChatTests from "../ChatTests";
import axios from "axios";
import SettingsButton from "../SettingsButton";

async function fetchUsers(token) {
    try {
        const response = await axios.get(`http://localhost:8000/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch (err) {
        console.error("Error during fetching users:", err);
        return [];
    }
}

export default function Messages() {
    const [authorized, setAuthorized] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const result = await isLoggedIn();
            setAuthorized(result);
        };
        checkAuth();
    }, []);

    const token = localStorage.getItem('token');
    const [ users, setUsers ] = useState([]);

    const loadUsers = useCallback(async () => {
        const response = await fetchUsers(token);
        setUsers(response.data.users_data);
    }, [token]);

    useEffect(() => {
        const load = async () => {
            await loadUsers();
        }
        load();
    }, [loadUsers]);

    const chatInputRef = useRef(null);

    const [chatUserId, setChatUserId] = useState(null);
    function handleUserClick(id) {
        chatInputRef.current.focus();
        setChatUserId(id);
    }

    if (authorized === null || !users) return <div>Ładowanie...</div>;
    if (authorized === false) return <Navigate to='/login' replace />;

    return (
        <div className="messagesPage">
            <UsersList users={users} onClick={handleUserClick}/>
            <Chat
                key={1}
                chatUserId={chatUserId}
                token={token}
                chatInputRef={chatInputRef}
            />
            {/* <ChatTests /> */}
            <SettingsButton />
            <LogoutButton />
        </div>
    )
}