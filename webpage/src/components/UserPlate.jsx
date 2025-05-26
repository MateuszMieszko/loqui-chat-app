import defaultIcon from '../img/defaultUser.png'

function UserIcon({ icon=defaultIcon, alt="User", onClick=undefined }) {
    return (
        <img
            className="userIcon"
            src={icon}
            alt={alt}
            onClick={onClick}
        />
    )
}

function UserNametag({ children, onClick=undefined, deleted=false }) {
    return (
        <p
            className={ deleted ? "userNametag, deleted" : "userNametag" }
            onClick={onClick}
            >
                {children}
            </p>
    )
}

export default function UserPlate({ icon=defaultIcon, onClick=undefined, deleted=false, children }) {

    return (
        <div
            className="userPlate"
            onClick={onClick}
            >
                <UserIcon icon={icon} alt={`${children} profile picture`} onClick={onClick} />
                <UserNametag onClick={onClick} deleted={deleted}> {children} </UserNametag>
            </div>
    )
}
