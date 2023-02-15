import { AccountType } from "../datatype";

export interface Signup {
  accountType: AccountType;
  profile: {
    fullName: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
    countryCode: string;
    phNo: string;
    college: string;
    course: string;
    graduation: string;
    company: string;
    role: string;
  },
  social: {
    cloudskillboost: string;
    linkedin: string;
    github: string;
    website: string;
  },
  misc: {
    foodPref: string;
    thisrt: string;
  }
}