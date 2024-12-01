"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";



const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    

    const router = useRouter();
    const {userLogged, logout} = useAuth();
    
    useEffect(() => {
        if (!userLogged) {
            router.push('/login')
        }
        else {
            router.push('/dashboard')
        }
    },[userLogged,router]);
    

return <>{children}</>;
};

export default ProtectedLayout;