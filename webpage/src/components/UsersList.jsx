import { useState } from "react"
import UserPlate from "./UserPlate"
import SearchBar from "./SearchBar";

export default function UsersList({ users, onClick=undefined }) {

    const [ searchedUsers, setSearchedUsers ] = useState(users);

    function handleChange(e) {
        console.log(e.target.value);
        const newText = e.target.value;
        let newUsers = [[], [], [], []];
        for ( let user of users ) {
            console.log(user.substring(0, newText.length));
            console.log(user.substring(0, newText.length) === newText);
            if(user.substring(0, newText.length) === newText) newUsers[0].push(user);
            else if(user.toLowerCase().substring(0, newText.length) === newText.toLowerCase()) newUsers[1].push(user);
            else if(user.includes(newText)) newUsers[2].push(user);
            else newUsers[3].push(user);
        }
        console.log(newUsers);
        setSearchedUsers(newUsers[0].concat(newUsers[1]).concat(newUsers[2]).concat(newUsers[3]));
    }

    return (
        <div
            className="usersList"
            >
                <SearchBar handleChange={handleChange}/>
                <div className="userPlates">
                    {searchedUsers.map((user) => <UserPlate onClick={onClick} key={user}> {user} </UserPlate>)}
                </div>
            </div>
    )
}
