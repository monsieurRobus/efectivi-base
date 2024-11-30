"use client"

import React, { useState } from 'react'

interface SwitchProps {
  label: string
  onChange?: (checked: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleToggle = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onChange) {
      onChange(newCheckedState)
    }
  }

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
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
            isChecked ? 'bg-primary' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            isChecked ? 'transform translate-x-full' : ''
          }`}
        ></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{label}</div>
    </label>
  )
}

export default Switch

