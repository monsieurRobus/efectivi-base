"use client"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const {userLogged, logout} = useAuth();
  const router = useRouter();
useEffect(() => {
    if (!userLogged) {
        router.push('/login')
    }
    else {
        router.push('/dashboard')
    }
},[userLogged])

}
