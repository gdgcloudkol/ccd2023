import React from "react"
import { ThemeContext } from "../components/Theme/ThemeContext"
import { DARK, LIGHT, THEME_KEY } from "./constants"

export const randomTextGoogleColor = () => {
  let color = [
    'text-google-blue',
    'text-google-red',
    'text-google-green',
    'text-google-yellow'
  ]
  return (color[Math.floor(Math.random() * color.length)])
}

export const rawRandomGoogleColor = () => {
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
  if (theme === DARK) return DARK;
  return LIGHT;
}

export const CurrentThemeLS = () => {
  return localStorage.getItem(THEME_KEY)
}
