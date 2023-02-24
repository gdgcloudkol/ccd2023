export interface HomeButtonContent {
  id: string;
  title: string;
  color: string;
  hoverColor: string;
  hyperlink: string;
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
  ticketButton: HomeButtonContent[];
  cfsButton: HomeButtonContent[];
  landingPage: LandingPageContent;
  cfs: HomeCFSContent;
}

export interface LandingPageContent {
  subTitle1: string;
  description1: string;
  subTitle2: string;
  description2: string;
  subTitle3: string;
  description3: string;
  subTitle4: string;
  description4: string;
  subTitle5: string;
  description5: string;
  youtubeLink: string;
  youtubeLinkTitle: string;
}

export interface HomeCFSContent {
  title: string;
  subtitle: string;
  description: string;
}