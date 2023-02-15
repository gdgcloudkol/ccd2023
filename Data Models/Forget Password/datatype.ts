import { AccountType } from "../datatype";

export interface ForgetPassword {
  accountType: AccountType;
  email: string;
}