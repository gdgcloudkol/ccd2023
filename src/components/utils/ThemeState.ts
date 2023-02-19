import React from "react"
import { ThemeContext } from "../Theme/ThemeContext"
export const ThemeState = () => {
  const { theme } = React.useContext(ThemeContext);
    if (theme === 'dark') return 'white';
    return 'black';
}
