import { Navigate } from "react-router-dom";

export default function Messages() {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return <Navigate to='/login' replace />
    }

    return (
        <h1>messages</h1>
    );
}