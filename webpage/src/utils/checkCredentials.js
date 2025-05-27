import axios from 'axios';

const checkCredentials = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth', {
            username: username,
            password: password
        });
        return response.data.login;
    }
    catch (err) {
        console.error('Error occured during checking if user is logged in:', err);
        return false;
    }
}

export {
    checkCredentials
}