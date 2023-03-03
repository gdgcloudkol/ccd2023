import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpPayload, SignInPayload, LoginData } from '../assets/models/login/datatype';
import { ACCESS_TOKEN_KEY, BASE_AUTH_URI, HOME_ROUTE, LOGGED_IN_KEY, PROFILE_ROUTE } from './constants';

export async function ApiSignIn(
  payload: SignInPayload,
  setLoggedInState: React.Dispatch<React.SetStateAction<boolean>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.post(BASE_AUTH_URI + '/login/', payload);

    if (res?.status === 200) {
      const data = res.data as LoginData;
      setLoggedInState(true);
      localStorage.setItem(LOGGED_IN_KEY, 'true');
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiSignup(
  payload: SignUpPayload,
  setLoggedInState: React.Dispatch<React.SetStateAction<boolean>>
): Promise<AxiosResponse> {
  const navigate = useNavigate();
  try {
    const res = await axios.post(BASE_AUTH_URI + '/registration/', payload);

    if (res?.status === 200) {
      const res = await ApiSignIn({ email: payload.email, password: payload.password1, username: payload.username }, setLoggedInState);

      if (res.status === 200) {
        navigate(PROFILE_ROUTE);
      } else if (res.status === 400) {
        throw "Signup Error";
      }
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export function ApiLogout(setLoggedInState: any, navigate: any) {
  localStorage.removeItem(LOGGED_IN_KEY);
  setLoggedInState(false);
  navigate(HOME_ROUTE);
}
