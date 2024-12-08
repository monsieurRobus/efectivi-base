import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const weekDays = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]
const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
export const getWeekDay = (day: number) => weekDays[day]
export const getMonth = (month: number) => months[month]

const valuesDistance = [
  { min: 0, max:100, value: 0 },
  { min: 101, max: 200, value: 60 },
  { min: 201, max: 300, value: 410 },
  { min: 301, max: 400, value: 457.63 },
  { min: 401, max: 500, value: 497.63 },
  { min: 501, max: 600, value: 547.63 },
  { min: 601, max: 700, value: 1037.63 },
  { min: 701, max: 800, value: 1117.63 },
  { min: 801, max: 900, value: 1157.63 },
  { min: 901, max: 1000, value: 1507.63 },
  { min: 1001, max: 1100, value: 1557.63 },
  { min: 1101, max: 1200, value: 1597.63 },
]

export function getDistanceValue(distance: number) {
  const found = valuesDistance.find((val) => distance >= val.min && distance <= val.max)
  console.log(found)
  return found?.value ?? 0
}