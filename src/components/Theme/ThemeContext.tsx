import React from 'react';

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

export const ThemeContext = React.createContext<any | null>(null);

export const ThemeProvider = ({ initialTheme, children }: any) => {
  const [theme, setTheme] = React.useState(getInitialTheme);

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

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
