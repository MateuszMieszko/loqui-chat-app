import SettingsButton from "./SettingsButton";
import LogoutButton from "./LogoutButton";
import "./AccountPlate.css";

export default function AccountPlate({ username }) {
    return (
        <div className="account-plate">
            <h2>{username}</h2>
            <div>
                <SettingsButton />
                <LogoutButton />
            </div>
        </div>
    );
}