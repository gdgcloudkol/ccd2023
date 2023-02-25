import { AccountType } from '../datatype';

interface UserProfileData {
  college?: string;
  company?: string;
  country_code: string;
  course?: string;
  food_choice: string;
  graduation_year: number;
  phone?: string;
  role: string;
  tsize: string;
}

export interface UserData {
  email: string;
  first_name: string;
  profile: UserProfileData;
  username: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  user: UserData;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface SignInPayload {
  email: string;
  username: string;
  password: string;
  button: {
    oneTimeLink: string;
    submit: string;
    cancel: string;
  };
}

export interface SignUpPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
