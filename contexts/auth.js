import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUserFromCookies().catch(console.error);
    }, []);

    async function loadUserFromCookies() {
        const result = await axios.get('/api/m_user');
        console.log(result, 'result');
        // if (result.data.isLoggedIn) {
        //     setUser(result.data);
        //     setLoading(false);
        // }
    }

    return (
        <AuthContext.Provider value={{ user, loading, message }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
