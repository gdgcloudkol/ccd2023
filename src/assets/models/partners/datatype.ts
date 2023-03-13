export interface SponsorContent {
  sponsorId: string;
  sponsorName: string;
  hyperlink: string;
  imgSrc: string;
}

export interface PartnerContent {
  title: string;
  sponsors: [SponsorContent];
  description?: string;
}

export interface PartnerSponsorContent {
  title: string;
  description: string;
  partners: [PartnerContent];
  community_partners: PartnerContent;
}