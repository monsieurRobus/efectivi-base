"use client"

import React, { useState } from 'react'

interface SwitchProps {
  label: string
  onChange?: (checked: boolean) => void
  size?: 'small' | 'medium' | 'large'
}

const Switch: React.FC<SwitchProps> = ({ label, onChange, size = 'medium' }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleToggle = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onChange) {
      onChange(newCheckedState)
    }
  }

  const getSizeClasses = () => {
    const baseClasses = 'rounded-full transition-colors duration-300 ease-in-out'
    const thumbClasses = 'absolute bg-white rounded-full transition-transform duration-300 ease-in-out'

    switch (size) {
      case 'small':
        return {
          switch: `w-8 h-5 ${baseClasses}`,
          thumb: `w-3 h-3 left-1 top-1 ${thumbClasses}`,
          label: 'text-sm'
        }
      case 'large':
        return {
          switch: `w-20 h-12 ${baseClasses}`,
          thumb: `w-10 h-10 left-1 top-1 ${thumbClasses}`,
          label: 'text-lg'
        }
      default: // medium
        return {
          switch: `w-14 h-8 ${baseClasses}`,
          thumb: `w-6 h-6 left-1 top-1 ${thumbClasses}`,
          label: 'text-base'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className={`${sizeClasses.switch} ${
            isChecked ? 'bg-primary' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`${sizeClasses.thumb} ${
            isChecked ? 'transform translate-x-full' : ''
          }`}
        ></div>
      </div>
      <div className={`ml-3 text-gray-700 font-medium ${sizeClasses.label}`}>{label}</div>
    </label>
  )
}

export default Switch

