import { useEffect, useState, useRef } from "react"
import UserPlate from "./UserPlate"
import SearchBar from "./SearchBar";
import axios from "axios";

async function fetchUsers(token) {
    try {
        const response = await axios.get(`http://localhost:8000/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.users_data;
    }
    catch (err) {
        console.error("Error during fetching users:", err);
        return [];
    }
}

export default function UsersList({ onClick=undefined }) {
    const [users, setUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loadUsers = async () => {
            const usersData = await fetchUsers(token);
            setUsers(usersData);
        };
        loadUsers();
    }, []);

    function searchUsers(newText) {
        let newUsers = [[], [], [], [], []];
        for ( let user of users ) {
            let username = user.username;
            if(username.substring(0, newText.length) === newText) newUsers[0].push(user);
            else if(username.toLowerCase().substring(0, newText.length) === newText.toLowerCase()) newUsers[1].push(user);
            else if(username.includes(newText)) newUsers[2].push(user);
            else if(username.toLowerCase().includes(newText.toLowerCase())) newUsers[2].push(user);
            else newUsers[3].push(user);
        }
        setSearchedUsers(newUsers[0].concat(newUsers[1]).concat(newUsers[2]).concat(newUsers[3]));
    }

    function handleChange(e) {
        const newText = e.target.value;
        searchUsers(newText);
    }

    useEffect(() => {
        if (inputRef.current) {
            searchUsers(inputRef.current.value);
        } else {
            setSearchedUsers(users);
        }
    }, [users]);

    return (
        <div className="usersList">
            <SearchBar handleChange={handleChange} ref={inputRef}/>
            <div className="userPlates">
                {searchedUsers.map((user) => <UserPlate onClick={onClick} key={user.id} userId={user.id}>{user.username}</UserPlate>)}
            </div>
        </div>
    )
}
