"use client"
import React, { useEffect } from 'react'
import LoginForm from '../../components/molecules/LoginForm'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'


const Layout = ({
    children,
    }: {
        children: React.ReactNode
    }) => {
        const {userLogged} = useAuth();
        const router = useRouter();
        useEffect(()=>{
          if(userLogged)
            router.push('/dashboard')
        },[userLogged])
        
    return (
            <main>
                {children}
            </main>
    )
}

export default Layout