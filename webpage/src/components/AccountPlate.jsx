import SettingsButton from "./SettingsButton";
import LogoutButton from "./LogoutButton";
import "./AccountPlate.css";

export default function AccountPlate({ username }) {
    return (
        <div className="account-plate">
            <span>{username}</span>
            <div>
                <SettingsButton />
                <LogoutButton />
            </div>
        </div>
    );
}