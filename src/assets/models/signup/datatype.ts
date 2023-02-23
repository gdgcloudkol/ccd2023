import { AccountType } from "../datatype";

export interface SignupData {
  accountType: AccountType;
  speaker: boolean,
  speakerDetails?: {
    bio: string,
    city: string,
    accomodation: boolean,
    sampleRecordings: string[];
  },
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
    company?: string;
    role?: string;
  },
  social: {
    cloudskillboost?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  },
  misc: {
    theme?: 'light' | 'dark';
    foodPref?: 'veg' | 'non-veg';
    thisrt?: 's' | 'm' | 'l' |'xl' | 'xxl';
  }
}

export interface SignupContent {
  accountType: string;
  speaker: string,
  speakerDetails: {
    bio: string,
    city: string,
    accomodation: string,
    sampleRecordings: string;
  },
  profile: {
    fullName: string;
    displayName: string;
    email: string;
    countryCode: string;
    password: string;
    confirmPassword: string;
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
    theme: string;
    foodPref: string;
    thisrt: string;
  },
  button: {
    submit: string;
    reset: string;
    cancel: string;
  }
}