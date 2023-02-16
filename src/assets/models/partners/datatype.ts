export interface SponsorContent {
  sponsorId: string;
  sponsor: string;
  hyperlink: string;
}

export interface PartnerContent {
  title: string;
  sponsors: [SponsorContent];
}

export interface PartnersContent {
  title: string;
  description: string;
  partners: [PartnerContent];
  community_partners: [PartnerContent];
}