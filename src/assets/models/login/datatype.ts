import { AccountType } from "../datatype";

export interface LoginData {
  accountType: AccountType;
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
  }
}