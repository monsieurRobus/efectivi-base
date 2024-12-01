"use client"

import React, { useDeferredValue, useRef, useState, useCallback, useEffect } from 'react'
import { Input } from '../atoms/input'
import { loginService } from '../../services/loginServices'
import Switch from '../atoms/switch'
import { Button } from '../atoms/button'
import { useToast } from '@/context/ToastContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const emailDeferred = useDeferredValue(email);
  const [password, setPassword] = useState('');
  const passwordDeferred = useDeferredValue(password);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [passError,setPassError] = useState('');
  const [emailError,setEmailError] = useState('');
  const { addToast } = useToast();
  const { userLogged, login, logout} = useAuth();
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para manejar el inicio de sesión
    const {jwt,user,error} = await loginService({ email, password, remember })
    console.log(jwt,user,error)
    if(error){
      setError(error)
      if(error.status == 400 && error.name)
      {
        setEmailError('Correo o contraseña no válidos')
        setPassError('Revise su correo y contraseña')
        addToast('¡No se pudo loguear! Revisar credenciales', 'error');
      }
    }
    else if(jwt){
      login(user,jwt);
      addToast('¡Logueado correctamente!', 'success');
    }

  },[email,password,remember])


  useEffect(() => {

    setEmailError('')
    setPassError('')

  },[email,password,remember])


  return <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                error={emailError}
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
                error={passError}
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
  
}

