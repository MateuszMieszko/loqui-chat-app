import { useEffect, useState, useRef } from "react"
import UserPlate from "./UserPlate"
import SearchBar from "./SearchBar";
import axios from "axios";
import sortingIcon from "../assets/sort_icon.png";

async function fetchUsers(token, sortingOrder, search = "") {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users?sortingOrder=${sortingOrder}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
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

function SortingOrderButton({ onClick, children }) {
    return (
        <span
            className={`sortingOrderButton`}
            onClick={onClick}
        >
            {children}
        </span>
    );
}

export default function UsersList({ onClick=undefined }) {
    const [users, setUsers] = useState([]);
    const inputRef = useRef(null);
    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");

    const [sortingOrder, setSortingOrder] = useState("ASC");
    function toggleSortingOrder() {
        setSortingOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
    }

    // Fetch all users on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const loadUsers = async () => {
            const usersData = await fetchUsers(token, sortingOrder);
            console.log("Fetched users:", usersData);
            setUsers(usersData);
        };
        loadUsers();
    }, [sortingOrder]);

    useEffect(() => {
        const onStorage = () => setLang(localStorage.getItem("lang") || "pl");
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    const messages = {
        pl: {
            noUserFound: "Brak użytkowników spełniających kryteria wyszukiwania."
        },
        en: {
            noUserFound: "No users matching the search criteria."
        }
    }
    // Search users on input change (debounced)
    async function handleChange(e) {
        const newText = e.target.value;
        const token = localStorage.getItem('token');
        const usersData = await fetchUsers(token, sortingOrder, newText);
        console.log("Fetched users:", usersData);
        setUsers(usersData);
    }

    return (
        <div className="usersList">
            <SearchBar handleChange={handleChange} ref={inputRef}/>
            <SortingOrderButton onClick={toggleSortingOrder}><img src={sortingIcon} />
            </SortingOrderButton>
            <div className="userPlates">
                {users.length === 0 ? (
                    <div style={{ padding: "1em", color: "#888" }}> {messages[lang].noUserFound} </div>
                ) : (
                    users.map((user) => <UserPlate onClick={onClick} key={user.id} userId={user.id}>
                        {user.username}
                    </UserPlate>)
                )}
            </div>
        </div>
    )
}
