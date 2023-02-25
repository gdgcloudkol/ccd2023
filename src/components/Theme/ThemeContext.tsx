import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

const getInitialTheme = () => {
  const lsTheme = localStorage.getItem('theme');
  if (typeof lsTheme === 'string') {
    return lsTheme;
  }
  const userMedia = window?.matchMedia('(prefers-color-scheme: dark)');
  if (userMedia.matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeContext = createContext<{ theme: string | null, setTheme: Dispatch<SetStateAction<string>> }>
  ({} as { theme: string | null, setTheme: Dispatch<SetStateAction<string>> });

export const ThemeProvider = ({ initialTheme, children }: any) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (rawTheme: any) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('theme', rawTheme);
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
