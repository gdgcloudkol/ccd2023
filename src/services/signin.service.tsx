import axios, { AxiosResponse } from 'axios';
import { LoginData, SignInPayload, SignUpPayload } from '../assets/models/login/datatype';
import { ACCESS_TOKEN_KEY, BASE_EMAIL_RESEND_URL, BASE_EMAIL_VERIFICATION_URL, BASE_LOGIN_URI, BASE_LOGOUT_URI, BASE_REGISTRATION_URI, HOME_ROUTE, LOGGED_IN_KEY } from './constants';
import { NavigateFunction } from 'react-router-dom';

export async function ApiSignIn(
  payload: SignInPayload,
  setLoggedInState: React.Dispatch<React.SetStateAction<boolean>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_LOGIN_URI, payload);

    if (res?.status === 200) {
      const data = res.data as LoginData;
      setLoggedInState(true);
      localStorage.setItem(LOGGED_IN_KEY, 'true');
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token); // access-token is JWT
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
      throw "Signup Error";
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiLogout(
  setLoggedInState: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) {
  try {
    const res = await axios.get(BASE_LOGOUT_URI);
    if (res?.status !== 200) {
      throw "Logout Error";
    }
    localStorage.removeItem(LOGGED_IN_KEY);
    setLoggedInState(false);
    navigate(HOME_ROUTE);
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
      throw "Verification Error";
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiResendVerification(
  payload: string
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_EMAIL_RESEND_URL, { email: payload });
    if (res?.status !== 200) {
      throw "Resend Verification Error";
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
};
