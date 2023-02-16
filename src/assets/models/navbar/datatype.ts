export interface NavbarContent {
  navbarPermanent: NavbarItemContent[];
  navbarSpatialLoggedIn: NavbarItemContent[];
  navbarSpatialNotLoggedIn: NavbarItemContent[];
}

export interface NavbarItemContent {
  title: string;
  link: string;
}