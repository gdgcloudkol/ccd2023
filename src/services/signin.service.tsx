import axios, { AxiosResponse } from 'axios';
import {
  LoginData,
  SignInPayload,
  SignUpPayload
} from '../assets/models/login/datatype';
import {
  ACCESS_TOKEN_KEY,
  BASE_AUTH_URI,
  BASE_LOGIN_URI,
  BASE_REGISTRATION_URI
} from './constants';
import { LoggedInState } from './state.service';

export async function ApiSignIn(
  payload: SignInPayload,
  setLoggedInState: React.Dispatch<React.SetStateAction<LoggedInState>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_LOGIN_URI, payload);

    if (res?.status === 200) {
      const data = res.data as LoginData;
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      setLoggedInState({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isLoggedIn: true,
        user: data.user
      });
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiSignup(
  payload: SignUpPayload
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_REGISTRATION_URI, payload);
    if (res.status === 200) {
      return res;
    } else if (res.status === 400) {
      return res.data;
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export function ApiLogout(
  setLoggedInState: React.Dispatch<React.SetStateAction<LoggedInState>>
) {
  // https://api.gdgcloud.kolkata.dev/auth/logout/
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  setLoggedInState({
    accessToken: '',
    refreshToken: '',
    isLoggedIn: false
  });
}

export async function ApiFetchProfile(accessToken: string) {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const res = await axios.get(`${BASE_AUTH_URI}/user/`, { headers });
    return res;
  } catch (e: any) {
    return e.response;
  }
}
