export interface HomeButtonContent {
  id: string;
  title: string;
  color: string;
  hoverColor: string;
  hyperLink: string;
  state?: 'disabled' | 'active';
}

export interface HomeContent {
  presents: string;
  event: string;
  description: string;
  dateTitle: string;
  date: string;
  locationTitle: string;
  location: string;
  buttonLeft: HomeButtonContent[];
  buttonRight: HomeButtonContent[];
}