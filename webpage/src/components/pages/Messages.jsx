import UsersList from "../UsersList";
import Chat from "../Chat";
import "./Messages.css"
import "../Chat.css"
import "../Users.css"

export default function Messages() {
  const users = [ "Zuzol", "Tofik", "Mati", "Patryk", "Kuba"];
    return (
        <div className="messagesPage">
            <UsersList users={users} />
            <Chat />
        </div>
    )
}