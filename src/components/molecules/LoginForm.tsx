"use client"

import React, { useState } from 'react'
import { Input } from '../atoms/input'
import { login } from '../../services/loginServices'
import Switch from '../atoms/switch'
import { Button } from '../atoms/button'
import { setCookie } from '../../utils/tools'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para manejar el inicio de sesión
    const response = await login({ email, password, remember })
    response.jwt ? setCookie('token', response.jwt, 1) : null;
    console.log(response)
    console.log('Login submitted', { email, password, remember })  // Mejorar la gestion del login y del auth!!!
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="Contraseña"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              label="Recordarme"
              onChange={(checked) => setRemember(checked)}
            />
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4"
            >
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

