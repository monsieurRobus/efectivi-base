"use client"

import { useAuth } from '@/context/AuthContext'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {

    const { userLogged, logout } = useAuth();
  
  return userLogged && (
    <header className={'fixed flex flex-row justify-between px-2 md:px-12 w-full h-12 items-center border-b border-stone-950'}>
        <div>
          <nav className={'flex flex-row gap-2'}>
            <span>gigger</span>
            <Link href={'/'}>Home</Link>
            <Link href={'/events'}>Eventos</Link>

          </nav>
        </div>
        <div className={'flex flex-row gap-2'}>
            <div className={'flex flex-row gap-2'}>
              <User className={'w-6 h-6'} />
              <span>{userLogged.username}</span>
            </div>
            <Link className={'text-slate-500'} onClick={logout} href={'/'}>Logout</Link>
            {/* <Image src={'https://ui-avatars.com/api/?name='+userLogged.username} alt={'user avatar'} width={40} height={40} className={'rounded-full'} /> */}
        </div>
    </header>
  )
}

export default Header