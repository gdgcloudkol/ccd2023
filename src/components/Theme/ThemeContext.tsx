import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DARK, LIGHT, THEME_KEY } from '../../services/constants';

const getInitialTheme = () => {
  const lsTheme = localStorage.getItem(THEME_KEY);
  if (typeof lsTheme === 'string') {
    return lsTheme;
  }
  const userMedia = window?.matchMedia('(prefers-color-scheme: dark)');
  if (userMedia.matches) {
    return DARK;
  }
  return LIGHT;
};

export const ThemeContext = createContext<{ theme: string | null, setTheme: Dispatch<SetStateAction<string>> }>
  ({} as { theme: string | null, setTheme: Dispatch<SetStateAction<string>> });

export const ThemeProvider = ({ initialTheme, children }: any) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (rawTheme: any) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === DARK;

    root.classList.remove(isDark ? LIGHT : DARK);
    root.classList.add(rawTheme);

    localStorage.setItem(THEME_KEY, rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
