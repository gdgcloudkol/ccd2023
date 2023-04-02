import { AccountType } from '../datatype';

export interface InputDataType {
  name: string;
  label: string;
  type: 'text' | 'passoword' | 'toggle' | 'option' | 'number' | 'textarea';
  options?: string[];
  placeholder: string;
  required: boolean;
  maxLength?: number;
}

export interface SpeakerContent {
  bio: InputDataType;
  tagLine: InputDataType;
  accomodation: InputDataType;
  sampleRecordings: InputDataType;
  order: string[];
}

export interface InitialProfileContent {
  username: InputDataType;
  email: InputDataType;
  password: InputDataType;
  confirmPassword: InputDataType;
  order: string[];
}

export interface InitialProfileData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileContent {
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
  order: string[];
}

export interface ProfileData {
  fullName: string;
  displayName: string;
  countryCode: string;
  phNo: string;
  college: string;
  course: string;
  graduation: string;
  company: string;
  role: string;
  city: string;
}

export interface SignupSocialContent {
  cloudskillboost?: InputDataType;
  linkedin?: InputDataType;
  github?: InputDataType;
  website?: InputDataType;
  other?: InputDataType;
  order: string[];
}

export interface SocialData {
  cloudskillboost?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  other?: string;
}

export interface MiscData {
  theme?: 'light' | 'dark';
  foodPref?: 'veg' | 'non-veg';
  tshirt?: 's' | 'm' | 'l' | 'xl' | 'xxl';
}

export interface MiscContent {
  theme: InputDataType;
  foodPref: InputDataType;
  tshirt: InputDataType;
  order: string[];
}

export interface SignupData {
  accountType: AccountType;
  verifiedEmail: boolean;
  initialProfile: InitialProfileData;
  profile?: ProfileData;
  social?: SocialData;
  speakerProfile?: boolean;
  speakerDetails?: {
    bio: string;
    accomodation: boolean;
    sampleRecordings: string[];
  };
  misc?: MiscData;
}

export interface SignupContent {
  title: string;
  signin: string;
  signinLink: string;
  bgImg: string;
  accountType: InputDataType;
  verifiedEmail: string;
  initialProfile: InitialProfileContent;
  profile: ProfileContent;
  social: SignupSocialContent;
  misc: MiscContent;
  speakerProfile: InputDataType;
  speakerDetails: SpeakerContent;
  button: {
    submit: string;
    reset: string;
    cancel: string;
  };
}