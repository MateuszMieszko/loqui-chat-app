import { useEffect, useState, useRef } from "react"
import UserPlate from "./UserPlate"
import SearchBar from "./SearchBar";

export default function UsersList({ users, onClick=undefined }) {


    const [ searchedUsers, setSearchedUsers ] = useState(users);

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

    const inputRef = useRef(null);

    useEffect(() => {
        searchUsers(inputRef.current.value);
    }, [users]);

    return (
        <div
            className="usersList"
            >
                <SearchBar handleChange={handleChange} ref={inputRef}/>
                <div className="userPlates">
                    {searchedUsers.map((user) => <UserPlate onClick={onClick} key={user.id} userId={user.id}>{user.username}</UserPlate>)}
                </div>
            </div>
    )
}
