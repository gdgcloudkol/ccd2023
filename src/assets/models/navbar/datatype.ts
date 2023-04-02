export interface NavbarContent {
  navbarPermanent: NavbarItemContent[];
  navbarSpatialLoggedIn: NavbarItemContent[];
  navbarSpatialNotLoggedIn: NavbarItemContent[];
  navbarSpatialLoggedInBT: NavbarItemContent[];
}

export interface NavbarItemContent {
  title: string;
  link: string;
}