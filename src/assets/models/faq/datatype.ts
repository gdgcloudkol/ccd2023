export interface FAQContentFAQ {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  description: string;
  faq: FAQContentFAQ[];
}