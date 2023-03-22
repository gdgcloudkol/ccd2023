export type AccountType = 'student' | 'professional' | 'speaker';

export interface SponsorRule {
  showCommunityPartners: boolean;
  showSponsors: boolean;
  timer?: boolean;
}

export interface HomeRule extends SponsorRule {
  ticketButtonStateNotLogin: string;
  ticketButtonStateLogin: string;
  ticketButtonBought: string;
  disabledTicketButton: string[];
  cfsButtonStateNotLogin: string;
  cfsButtonStateLogin: string;
  disabledCfsButton: string[];
  cfs: boolean;
  location: boolean;
  date: boolean;
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
  navbarSpatialLoggedInBT: boolean;
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
  signup: string[];
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
  referral: boolean;
}