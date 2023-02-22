import React from "react"
import { ThemeContext } from "../components/Theme/ThemeContext"

export const textRandomColor = () => {
  let color = [
    'text-google-blue',
    'text-google-red',
    'text-google-green',
    'text-google-yellow'
  ]
  return (color[Math.floor(Math.random() * color.length)])
}

export const rawRandomColor = () => {
  let color = [
    '#4285f4',
    '#ea4335',
    '#fbbc05',
    '#34a853'
  ]
  return (color[Math.floor(Math.random() * color.length)])
}

export const CurrentTheme = () => {
  const { theme } = React.useContext(ThemeContext);
  if (theme === 'dark') return 'white';
  return 'black';
}

export const CurrentThemeLS = () => {
  return localStorage.getItem('color-theme')
}
