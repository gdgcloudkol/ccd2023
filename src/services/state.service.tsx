import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { UserData } from '../assets/models/login/datatype';
import { ACCESS_TOKEN_KEY } from './constants';
import { ApiFetchProfile } from './signin.service';

export interface LoggedInState {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  user: UserData;
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function clearSessionStorage() {
  sessionStorage.clear();
}

export const LoggedInContext = createContext<{
  loggedInState: LoggedInState;
  setLoggedInState: Dispatch<SetStateAction<LoggedInState>>;
}>(
  {} as {
    loggedInState: LoggedInState;
    setLoggedInState: Dispatch<SetStateAction<LoggedInState>>;
  }
);

export const LoggedInStateProvider = ({ children }: any) => {
  const [loggedInState, setLoggedInState] = useState<LoggedInState>({
    accessToken: '',
    refreshToken: '',
    isLoggedIn: false,
    user: {} as UserData
  });

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  useEffect(() => {
    if (accessToken && (!loggedInState.isLoggedIn || !loggedInState.user)) {
      ApiFetchProfile().then((res) => {
        if (res.status === 200) {
          setLoggedInState({
            accessToken: accessToken,
            refreshToken: '',
            isLoggedIn: true,
            user: res.data
          });
        }
      });
    }
  }, [accessToken, loggedInState]);

  return (
    <LoggedInContext.Provider value={{ loggedInState, setLoggedInState }}>
      {children}
    </LoggedInContext.Provider>
  );
};
