import React, { useState, InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  pattern?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, pattern, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (pattern) {
        const regex = new RegExp(pattern)
        setIsValid(regex.test(e.target.value))
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500",
              !isValid && "border-yellow-500",
              className
            )}
            ref={ref}
            onChange={handleValidation}
            pattern={pattern}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">
                {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </span>
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {!isValid && !error && (
          <p className="mt-1 text-xs text-yellow-500">
            El valor no cumple con el patrón requerido
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

