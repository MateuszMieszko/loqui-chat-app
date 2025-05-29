import axios from 'axios';

const isLoggedIn = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (err) {
        console.error('Error occured during checking if user is logged in:', err);
        return false;
    }
}

export {
    isLoggedIn
}