// base URIs
export const BASE_URI = 'https://api2.gdgcloud.kolkata.dev';
export const BASE_AUTH_URI = BASE_URI + '/auth/';
export const BASE_SPEAKER_URI = BASE_URI + '/speakers/';
export const BASE_TICKET_URI = BASE_URI + '/tickets/';
export const BASE_TECHNOLOGIES_URI = BASE_URI + '/technologies/';
export const BASE_EMAIL_VERIFICATION_URL = BASE_URI + '/account-confirm-email/';
export const BASE_TALKS_URI = BASE_URI + '/talks/';
export const BASE_EVENTS_URI = BASE_URI + '/events/';
export const BASE_USERS_URI = BASE_URI + '/users/';

// auth
export const BASE_REGISTRATION_URI = BASE_AUTH_URI + 'registration/';
export const BASE_LOGIN_URI = BASE_AUTH_URI + 'login/';
export const BASE_PASSWORD_RESET = BASE_AUTH_URI + 'password/reset/';
export const BASE_PASSWORD_RESET_CONFIRM = BASE_AUTH_URI + 'password/reset/confirm/';
export const BASE_PASSWORD_CHANGE = BASE_AUTH_URI + 'password/change/';
export const BASE_LOGOUT_URI = BASE_AUTH_URI + 'logout/';
export const BASE_AUTH_USER_URI = BASE_AUTH_URI + 'user/';

// registration
export const BASE_EMAIL_RESEND_URL = BASE_REGISTRATION_URI + 'resend-email/';

// user
export const BASE_USERS_UPDATE_URI = BASE_USERS_URI + 'profile/';
export const BASE_REFERRAL_URI = BASE_USERS_URI + 'add_referrer/';

// local api
export const BASE_CONTENT_URI = 'content';

// assets URI
export const BACKGROUND_ASSETS = '/ccd2023/images/background/';
export const COMMUNITY_PARTNER_ASSETS = '/ccd2023/images/communityPartners/';
export const SPONSORS_ASSETS = '/ccd2023/images/sponsors/';
export const LOGO_ASSETS = '/ccd2023/images/logos/';
export const DP_ASSETS = '/ccd2023/images/dp/';
export const TICKET_ASSETS = '/ccd2023/images/ticket/';

// content types
export type ContentTypes =
    | 'coc'
    | 'faq'
    | 'footer'
    | 'forgetPassword'
    | 'home'
    | 'login'
    | 'navbar'
    | 'partners'
    | 'signup'
    | 'social'
    | 'speakers'
    | 'team'
    | 'schedule';

// constants storage keys
export const FEATURE_RULE_KEY = 'featureRule';
export const COC_CONTENT_KEY = 'coc';
export const FAQ_CONTENT_KEY = 'faq';
export const FOOTER_CONTENT_KEY = 'footer';
export const FORGET_PASSWORD_CONTENT_KEY = 'forgetPassword';
export const HOME_CONTENT_KEY = 'home';
export const LOGIN_CONTENT_KEY = 'login';
export const NAVBAR_CONTENT_KEY = 'navbar';
export const PARTNERS_CONTENT_KEY = 'partners';
export const SIGNUP_CONTENT_KEY = 'signup';
export const SOCIAL_CONTENT_KEY = 'social';
export const SPEAKERS_CONTENT_KEY = 'speakers';
export const TEAM_CONTENT_KEY = 'team';

// other storage keys
export const LOGGED_IN_KEY = 'loggedIn';
export const ACCESS_TOKEN_KEY = 'accessToken';
export const TICKET_PURCHASED_KEY = 'ticketPurchased';
export const THEME_KEY = 'theme';

// routes
export const HOME_ROUTE = '/home';
export const PROFILE_ROUTE = '/profile';
export const TEAM_ROUTE = '/team';
export const VERIFY_EMAIL_ROUTE = '/verify-email';
export const LOGIN_ROUTE = '/login';
export const CFS_ROUTE = '/cfs';
export const TICKET_ROUTE = '/tickets';

// button states
export const ACTIVE = 'active';
export const INACTIVE = 'disabled';

// theme
export const DARK = 'dark';
export const LIGHT = 'light';