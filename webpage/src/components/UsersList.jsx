import { useEffect, useState, useRef } from "react"
import UserPlate from "./UserPlate"
import SearchBar from "./SearchBar";
import axios from "axios";

async function fetchUsers(token, search = "") {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/users${search ? `?search=${encodeURIComponent(search)}` : ""}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.users_data;
    }
    catch (err) {
        console.error("Error during fetching users:", err);
        return [];
    }
}

export default function UsersList({ onClick=undefined }) {
    const [users, setUsers] = useState([]);
    const inputRef = useRef(null);

    // Fetch all users on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const loadUsers = async () => {
            const usersData = await fetchUsers(token);
            console.log("Fetched users:", usersData);
            setUsers(usersData);
        };
        loadUsers();
    }, []);

    // Search users on input change (debounced)
    async function handleChange(e) {
        const newText = e.target.value;
        const token = localStorage.getItem('token');
        const usersData = await fetchUsers(token, newText);
        console.log("Fetched users:", usersData);
        setUsers(usersData);
    }

    return (
        <div className="usersList">
            <SearchBar handleChange={handleChange} ref={inputRef}/>
            <div className="userPlates">
                {users.length === 0 ? (
                    <div style={{ padding: "1em", color: "#888" }}>Brak użytkowników spełniających kryteria wyszukiwania.</div>
                ) : (
                    users.map((user) => <UserPlate onClick={onClick} key={user.id} userId={user.id}>{user.username}</UserPlate>)
                )}
            </div>
        </div>
    )
}
