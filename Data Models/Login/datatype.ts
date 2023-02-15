import { AccountType } from "../datatype";

export interface Login {
  accountType: AccountType;
  email: string;
  password: string;
}