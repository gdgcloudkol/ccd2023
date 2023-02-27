export type AccountType = 'student' | 'professional';

export interface HomeRule {
  ticketButtonStateNotLogin: string;
  ticketButtonStateLogin: string;
  disabledTicketButton: string[];
  cfsButtonStateNotLogin: string;
  cfsButtonStateLogin: string;
  disabledCfsButton: string[];
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

export interface SignInRule { [key: string]: boolean }

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
  login: SignInRule;
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