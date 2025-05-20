import UserPlate from "./UserPlate"

export default function UsersList({ users, onClick=undefined }) {
    return (
        <div
            className="usersList"
            >
                {users.map((user) => <UserPlate onClick={onClick}> {user} </UserPlate>)}
            </div>
    )
}