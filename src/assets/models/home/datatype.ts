export interface HomeButtonContent {
  id: string;
  title: string;
  color: string;
  hoverColor: string;
  hyperLink: string;
  state?: 'disabled' | 'active';
}

export interface HomeEventContent {
  presents: string;
  event: string;
  hashtagEventName: string;
  description: string;
  dateTitle: string;
  date: string;
  locationTitle: string;
  location: string;
  buttonLeft: HomeButtonContent[];
  buttonRight: HomeButtonContent[];
  landingPage: LandingPageContent;
}

export interface LandingPageContent {
  subTitle1: string;
  description1: string;
  description2: string;
}