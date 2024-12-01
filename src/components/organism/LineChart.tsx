"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ene', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
  { name: 'Jul', value: 900 },
]

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

