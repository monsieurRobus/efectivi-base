"use client"
import { getCookie, setCookie } from '@/utils/tools';
import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo, use} from 'react';


interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    userLogged: User | null;
    login: (userData: User, token:string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; 
}


export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
    const [userLogged, setUserLogged] = useState<User | null>(null);
    
    useEffect(() => {
        const userCookie = getCookie('user') ?? null;
        const userToken = getCookie('token') ?? null;
        if (userCookie && userToken && userCookie !== 'undefined') {
            try {
                const parsedUser = JSON.parse(userCookie);
                setUserLogged(parsedUser);
            } catch (error) {
                console.error('Error al parsear la cookie de usuario:', error);
                setUserLogged(null);
                // Opcional: eliminar las cookies corruptas
                setCookie('user', '', -1);
                setCookie('token', '', -1);
            }
        }
    }, []);
    
    const login = (userData: User,token:string) => {
        setUserLogged(userData); 
        setCookie('token', token, 1);
        setCookie('user', JSON.stringify(userData), 1);
    };
    const logout = () => {
        setUserLogged(null)
        setCookie('token', '', 0);
        setCookie('user', '', 0);
    };

    const contextValue = useMemo(() => ({
        userLogged,
        login,
        logout,
    }), [userLogged]);
    

    return (
        <AuthContext.Provider value={{ userLogged, login, logout }}>
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