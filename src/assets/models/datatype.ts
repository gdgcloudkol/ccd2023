export type AccountType = 'student' | 'professional';

export interface HomeRule {
  buttonLeftStateNotLogin: string;
  buttonLeftStateLogin: string;
  disabledLeftButton: string[];
  buttonRightStateNotLogin: string;
  buttonRightStateLogin: string;
  disabledRightButton: string[];
  timer: boolean;
  cfs: boolean;
  location: boolean;
  date: boolean;
  showCommunityPartners: boolean;
  showSponsors: boolean;
}

export interface SignupRule {
  accountType: boolean;
  fullName: boolean;
  displayName: boolean;
  email: boolean;
  countryCode: boolean;
  phNo: boolean;
  college: boolean;
  course: boolean;
  graduation: boolean;
  company: boolean;
  role: boolean;
  cloudskillboost: boolean;
  linkedin: boolean;
  github: boolean;
  website: boolean;
  foodPref: boolean;
  thisrt: boolean;
  submit: boolean;
  reset: boolean;
}

export interface LoginRule {
  accountType: boolean;
  email: boolean;
  password: boolean;
  oneTimeLink: boolean;
}

export interface ForgetPasswordRule {
  accountType: boolean;
  email: boolean;
  submit: boolean;
  cancel: boolean;
}

export interface NavbarRule {
  navbarPermanent: boolean;
  navbarSpatialLoggedIn: boolean;
  navbarSpatialNotLoggedIn: boolean;
}

export interface FooterRule {
  footer: boolean;
  section: {
    title: string;
    hide: boolean;
    nOI: number
  }[];
}

export interface FeatureRule {
  signup: SignupRule;
  login: LoginRule;
  forgetPassword: ForgetPasswordRule;
  navbar: NavbarRule;
  disabledRoutes: string[];
  disabledPartnerTitles: string[];
  disabledPartners: string[];
  disabledCommunityPartners: string[];
  home: HomeRule;
  disabledFooterContent: FooterRule;
  disabledSocial: string[];
}