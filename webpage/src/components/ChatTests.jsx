import Chat from './Chat'

export default function ChatTests() {
    return (
        <>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Chat
                    key={1}
                    chatUserId={2}
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGljZSIsImlhdCI6MTc0ODIzOTk2NCwiZXhwIjoxODM0NjM5OTY0fQ.vQ_28Mz3Qma6y0dyzE3eQiOiAFqnGjkmHMLin3qpI1A"
                />
                <Chat
                    key={2}
                    chatUserId={1}
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJib2IiLCJpYXQiOjE3NDgyNDg5MDAsImV4cCI6MTgzNDY0ODkwMH0.jDWw_gbrRHK8pLxzlQVO031PlF5R6QT20iKrZnUkrpk"
                />
            </div>
        </>
    );
}