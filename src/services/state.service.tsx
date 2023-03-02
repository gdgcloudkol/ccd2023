import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { LOGGED_IN_KEY } from './constants';

export function clearLocalStorage() {
  localStorage.clear();
}

export function clearSessionStorage() {
  sessionStorage.clear();
}

export const LoggedInContext = createContext<{
  loggedInState: boolean;
  setLoggedInState: Dispatch<SetStateAction<boolean>>;
}>(
  {} as {
    loggedInState: boolean;
    setLoggedInState: Dispatch<SetStateAction<boolean>>;
  }
);

export const LoggedInStateProvider = ({ children }: any) => {
  const [loggedInState, setLoggedInState] = useState(false);

  useEffect(() => {
    const state = localStorage.getItem(LOGGED_IN_KEY);
    setLoggedInState(state === 'true');
  }, [loggedInState]);

  return (
    <LoggedInContext.Provider value={{ loggedInState, setLoggedInState }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const LoggedInState = () => {
  return React.useContext(LoggedInContext);
};
