import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from "axios";
import './css/panel.css';

const Log = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loginAttempts, setLoginAttempts] = useState(parseInt(localStorage.getItem('loginAttempts') || '0'));
    const [isBlocked, setIsBlocked] = useState(localStorage.getItem('isBlocked') === 'true');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    };
useEffect(() => {
    const unblockTime = localStorage.getItem('unblockTime');
    if (isBlocked && unblockTime) {
        const unblockTimestamp = new Date(unblockTime).getTime();
        const now = new Date().getTime();

        if (now > unblockTimestamp) {
            setIsBlocked(false);
            localStorage.removeItem('isBlocked');
            localStorage.removeItem('unblockTime');
            localStorage.setItem('loginAttempts', '0');
        } else {
            // Ustawienie odliczania do odblokowania
            const timeout = setTimeout(() => {
                setIsBlocked(false);
                localStorage.removeItem('isBlocked');
                localStorage.removeItem('unblockTime');
                localStorage.setItem('loginAttempts', '0');
            }, unblockTimestamp - now);
            return () => clearTimeout(timeout);
        }
    }
}, [isBlocked]);

    const handleSubmit = async (e) => {
        e.preventDefault();
            if (isBlocked) {
            setErrorMessage('Dostęp został zablokowany. Spróbuj ponownie później.');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                credentials
            );
            if (response.status === 200) {
                console.log('Login successful');
                sessionStorage.setItem('token', response.data);
                setLoginAttempts(0);
                login();
                navigate('/Admin');
            }
        } catch (error) {
            setErrorMessage('Błędny login i hasło');
            const attempts = loginAttempts + 1;
            setLoginAttempts(attempts);
            localStorage.setItem('loginAttempts', attempts.toString());
            if (attempts >= 5) {
                setIsBlocked(true);
                localStorage.setItem('isBlocked', 'true');
                const unblockTime = new Date(new Date().getTime() + 1 * 6);  // 1 * 60000
                localStorage.setItem('unblockTime', unblockTime.toISOString());
            }
            console.error('Error during login:', error);
        }
    };

    return (
        <section className="Panel log">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </section>
    );
};

export default Log;
