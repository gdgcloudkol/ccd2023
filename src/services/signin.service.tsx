import axios, { AxiosResponse } from 'axios';
import { LoginData, SignInPayload, SignUpPayload } from '../assets/models/login/datatype';
import { ACCESS_TOKEN_KEY, BASE_LOGIN_URI, BASE_REGISTRATION_URI, HOME_ROUTE, LOGGED_IN_KEY } from './constants';

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
    if (res.status === 200) {
      return res
    } else if (res.status === 400) {
      return res.data;
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export function ApiLogout(setLoggedInState: any, navigate: any) {
  // https://api.gdgcloud.kolkata.dev/auth/logout/
  localStorage.removeItem(LOGGED_IN_KEY);
  setLoggedInState(false);
  navigate(HOME_ROUTE);
}
