export default function MessagePlate({ children, incoming=true, date=null }) {
    const type = incoming ? "incoming" : "outgoing";
    date = date ? date : "2025-05-15 09:12:00";
    const time = date.split("T")[1];
    const [hours, minutes] = time.split(":");
    const formattedTime = `${parseInt(hours)}:${minutes}`

    return (
        <>
            <div className={"message " + type}>
                <p>{children}</p>
                <span className="timestamp">{formattedTime}</span>
            </div>
        </>
    );
}