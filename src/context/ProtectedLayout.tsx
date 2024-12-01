"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";



const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    

    const router = useRouter();
    const {user, logout} = useAuth();
    
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    },[user,router]);
    

return <>{children}</>;
};

export default ProtectedLayout;