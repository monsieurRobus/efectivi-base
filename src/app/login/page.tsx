"use client"
import React, { useEffect } from 'react'
import LoginForm from '../../components/molecules/LoginForm'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type Props = {}

const page = (props: Props) => {
  const {userLogged} = useAuth();
  const router = useRouter();

  return (
    <main className={'flex flex-col'}>
        {userLogged ? <span>Redirecting...</span>: <LoginForm />}
    </main>
  )
}

export default page