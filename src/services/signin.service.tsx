import axios, { AxiosResponse } from 'axios';
import {
  LoginData,
  SignInPayload,
  SignUpPayload
} from '../assets/models/login/datatype';
import {
  ACCESS_TOKEN_KEY,
  BASE_AUTH_URI,
  BASE_EMAIL_RESEND_URL,
  BASE_EMAIL_VERIFICATION_URL,
  BASE_LOGIN_URI,
  BASE_LOGOUT_URI,
  BASE_PASSWORD_RESET,
  BASE_PASSWORD_RESET_CONFIRM,
  BASE_REGISTRATION_URI,
  HOME_ROUTE,
  LOGGED_IN_KEY
} from './constants';
import { NavigateFunction } from 'react-router-dom';
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
    if (res?.status !== 200) {
      throw 'Signup Error';
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiLogout(
  setLoggedInState: React.Dispatch<React.SetStateAction<LoggedInState>>,
  navigate: NavigateFunction
) {
  try {
    const res = await axios.get(BASE_LOGOUT_URI);
    if (res?.status !== 200) {
      throw 'Logout Error';
    }
    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setLoggedInState({
      accessToken: '',
      refreshToken: '',
      isLoggedIn: false
    });
    navigate(HOME_ROUTE);
    return res;
  } catch (e: any) {
    return e.response;
  }
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

export async function ApiEmailVerification(
  payload: string
): Promise<AxiosResponse> {
  try {
    let finalUrl = `${BASE_EMAIL_VERIFICATION_URL}${payload}`;
    const res = await axios.get(finalUrl);
    if (res?.status !== 200) {
      throw 'Verification Error';
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiResendVerification(
  payload: string
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_EMAIL_RESEND_URL, { email: payload });
    if (res?.status !== 200) {
      throw 'Resend Verification Error';
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiResetPasswordLink(
  payload: string
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_PASSWORD_RESET, { email: payload });
    if (res?.status !== 200) {
      throw new Error('Password Reset Error');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiResetPasswordConfirmLink(payload: {
  new_password1: string;
  new_password2: string;
  token: string;
  uid: string;
}): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_PASSWORD_RESET_CONFIRM, payload);
    if (res?.status !== 200) {
      throw new Error('Password Reset Error');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiUpdateProfile(
  payload: any,
  accessToken: string
): Promise<AxiosResponse> {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  try {
    const res = await axios.put(`${BASE_AUTH_URI}/user/`, payload, { headers });
    if (res?.status !== 200) {
      throw new Error('Profile Update Error');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}
