import axios, { AxiosResponse } from 'axios';
import {
  SignUpPayload,
  SignInPayload,
  LoginData
} from '../assets/models/login/datatype';

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/auth';

export async function ApiLogin(
  payload: SignInPayload,
  setLoggedInState: React.Dispatch<React.SetStateAction<boolean>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_AUTH_URI + '/login/', payload);

    if (res.status === 200) {
      const data = res.data as LoginData;
      setLoggedInState(true);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('accessToken', data.access_token);
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
    const res = await axios.post(BASE_AUTH_URI + '/registration/', payload);
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export function ApiLogout(setLoggedInState: any, navigate: any) {
  localStorage.removeItem('loggedIn');
  setLoggedInState(false);
  navigate('/home');
}
