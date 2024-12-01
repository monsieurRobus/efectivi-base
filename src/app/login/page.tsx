"use client"
import React from 'react'
import LoginForm from '../../components/molecules/LoginForm'

type Props = {}

const page = (props: Props) => {
  return (
    <main className={'flex flex-col'}>
        <LoginForm />
    </main>
  )
}

export default page