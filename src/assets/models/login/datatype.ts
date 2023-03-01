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
}

export interface SigninFieldContent {
  name: string;
  type: string;
  placeholder: string;
  show?: boolean;
  error?: string;
}

export interface SigninFieldButtonContent {
  name: string;
  title: string;
  link: string;
}

export interface SignInContent {
  title: string;
  fields: SigninFieldContent[];
  signUp: string;
  signUpLink: string;
  forgotPassword: string;
  forgotPasswordLink: string;
  button: SigninFieldButtonContent[];
}
