import { AccountType } from '../datatype';

export interface LoginData {
  accountType: AccountType;
  username: string;
  email: string;
  password: string;
}

export interface LoginContent {
  accountType: string;
  email: string;
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
