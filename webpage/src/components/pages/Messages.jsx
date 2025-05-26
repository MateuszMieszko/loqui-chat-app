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
            <Chat
                key={1}
                chatUserId={2}
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGljZSIsImlhdCI6MTc0ODIzOTk2NCwiZXhwIjoxODM0NjM5OTY0fQ.vQ_28Mz3Qma6y0dyzE3eQiOiAFqnGjkmHMLin3qpI1A"
            />
        </div>
    )
}