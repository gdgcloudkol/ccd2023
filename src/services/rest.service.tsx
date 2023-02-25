import axios from 'axios';
import { SignUpPayload } from '../assets/models/login/datatype';

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/auth';

export function ApiLogin(
  username: string,
  password: string,
  setLoggedInState: any
) {
  axios
    .post(BASE_AUTH_URI + '/login/', { username, password })
    .then((data) => {
      console.log(data);
      setLoggedInState(true);
      console.log(data);
      localStorage.setItem('loggedIn', 'true');
    })
    .catch((e) => console.log(e));
}

export function ApiSignup(payload: SignUpPayload) {
  return axios
    .post(BASE_AUTH_URI + '/registration/', payload)
    .then((data) => {
      localStorage.setItem('loggedIn', 'true');
      return data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}

export function ApiLogout(setLoggedInState: any, navigate: any) {
  localStorage.removeItem('loggedIn');
  setLoggedInState(false);
  navigate('/home');
}
