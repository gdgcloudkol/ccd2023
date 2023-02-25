import { AccountType } from "../datatype";

export interface ForgetPasswordData {
  accountType: AccountType;
  email: string;
}

export interface ForgetPasswordContent {
  accountType: string;
  email: string;
  button: {
    submit: string;
    cancel: string;
  }
}