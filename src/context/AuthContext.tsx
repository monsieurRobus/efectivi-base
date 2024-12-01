"use client"
import { getCookie, setCookie } from '@/utils/tools';
import React, { createContext, useState, useContext, ReactNode, useEffect} from 'react';


interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User, token:string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; 
}


export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const userCookie = getCookie('user');
        const userToken = getCookie('token');
        if (userCookie && userToken) {
            setUser(JSON.parse(userCookie));
        }
    }, []);
    
    const login = (userData: User,token:string) => {
        setUser(userData); 
        setCookie('token', token, 1);
        setCookie('user', JSON.stringify(userData), 1);
    };
    const logout = () => {7
        setUser(null)
        setCookie('token', '', 0);
        setCookie('user', '', 0);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}