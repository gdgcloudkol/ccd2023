import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { UserData } from '../assets/models/login/datatype';
import { ACCESS_TOKEN_KEY } from './constants';
import { ApiFetchProfile } from './signin.service';
import { ApiViewTickets } from './ticket.service';

export interface LoggedInState {
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  user: UserData;
  ticket?: any;
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
      Promise.all([
        ApiFetchProfile(),
        ApiViewTickets()
      ]).then(([res, ticket]) => {
        if (res.status === 200) {
          setLoggedInState({
            accessToken: accessToken,
            refreshToken: '',
            isLoggedIn: true,
            user: res.data,
            ticket: ticket.data[0]
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
