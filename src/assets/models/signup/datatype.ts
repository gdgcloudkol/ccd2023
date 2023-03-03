import { AccountType } from "../datatype";

export interface InputDataType {
  label: string;
  type: 'text' | 'passoword' | 'toggle' | 'option' | 'number' | 'textarea';
  options?: string[];
  placeholder: string;
  required: boolean;
}

export interface SpeakerContent {
  bio: InputDataType;
  tagLine: InputDataType;
  accomodation: InputDataType;
  sampleRecordings: InputDataType;
}

export interface InitialProfileDataAndContent {
  username: InputDataType;
  email: InputDataType;
  password: InputDataType;
  confirmPassword: InputDataType;
};

export interface ProfileDataAndContent {
  fullName: InputDataType;
  displayName: InputDataType;
  countryCode: InputDataType;
  phNo: InputDataType;
  college: InputDataType;
  course: InputDataType;
  graduation: InputDataType;
  company: InputDataType;
  role: InputDataType;
  city: InputDataType;
}

export interface SocialDataAndContent {
  cloudskillboost?: InputDataType;
  linkedin?: InputDataType;
  github?: InputDataType;
  website?: InputDataType;
  other?: InputDataType;
}

export interface MiscContent {
  theme: InputDataType;
  foodPref: InputDataType;
  tshirt: InputDataType;
}

export interface SignupData {
  accountType: AccountType;
  verifiedEmail: boolean;
  initialProfile: InitialProfileDataAndContent;
  profile?: ProfileDataAndContent;
  social?: SocialDataAndContent;
  speakerProfile?: boolean;
  speakerDetails?: {
    bio: string;
    accomodation: boolean;
    sampleRecordings: string[];
  };
  misc?: {
    theme?: 'light' | 'dark';
    foodPref?: 'veg' | 'non-veg';
    tshirt?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  }
}

export interface SignupContent {
  title: string;
  signin: string;
  signinLink: string;
  accountType: string;
  verifiedEmail: string;
  initialProfile: InitialProfileDataAndContent;
  profile: ProfileDataAndContent;
  social: SocialDataAndContent;
  misc: MiscContent;
  speakerProfile: string;
  speakerDetails: SpeakerContent;
  button: {
    submit: string;
    reset: string;
    cancel: string;
  }
}