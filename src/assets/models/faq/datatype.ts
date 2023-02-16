export interface FAQContent {
  title: string;
  subHeading1: string;
  subheading2: string;
  description: string;
  faq: { question: string, answer: string }[]
}