"use client"

import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Header = (props: Props) => {

    const { userLogged } = useAuth();
  
  return userLogged && (
    <header className={'flex flex-row justify-between h-12 items-center'}>
        <div></div>
        <div>
            <span>{userLogged.username}</span>
            {/* <Image src={'https://ui-avatars.com/api/?name='+userLogged.username} alt={'user avatar'} width={40} height={40} className={'rounded-full'} /> */}
        </div>
    </header>
  )
}

export default Header