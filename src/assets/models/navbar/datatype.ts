export interface NavbarContent {
  navbar_permanent: NavbarItemContent[];
  navbar_spatial_loggedin: NavbarItemContent[];
  navbar_spatial_not_loggedin: NavbarItemContent[];
}

export interface NavbarItemContent {
  title: string;
  link: string;
}