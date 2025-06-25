import { IconName } from 'lucide-react/dynamic';
import { SectionType } from './constants';

export interface NavigationProps {
  navLinks: {
    label: string;
    link: {
      slug: string;
    }
  }[]
  
  cta: {
    label: string;
    link: {
      slug: string;
    }
  }
}

export interface CTAProps {
  title: string;
  description: string;
  ctaBtns: CTAButton[]
  imageUrl: ImageUrls;
}

// Common interfaces
export interface CTAButton {
  label: string;
  style: "primary" | "secondary" | "outline" | "none";
  internalPage?: {
    slug: string;
  };
  externalLink?: string;
}

export interface ImageUrls {
  desktop: string;
  mobile: string;
}

// Section interfaces
export interface HeroSectionProps {
  _key: string;
  _type: "heroSection";
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: ImageUrls;
  ctaBtns?: CTAButton[];
}

export interface FeatureCardsProps {
  _key: string;
  _type: "featureCards";
  title: string;
  cards: {
    title: string;
    description: string;
    icon: IconName;
    color: string;
  }[];
}

export interface IntroductionProps {
  _key: string;
  _type: "introduction";
  title: string;
  description: string;
  imageUrl: string;
  facts: {
    title: string;
    description: string;
    icon: IconName;
  }[];
  ctaBtns: CTAButton[];
}

export interface BentoGalleryProps {
  _key: string;
  _type: "bentoGallery";
  title: string;
  imageUrl: {
    label: string;
    mobileImage: string;
    desktopImage: string;
  }[];
  ctaBtns: CTAButton[];
}

export interface TestimonialsProps {
  _key: string;
  _type: "testimonials";
  title: string;
  testimonials: {
    video: string;
    thumbnail: string;
    author: string;
    authorTitle: string;
  }[];
}

export interface ContactProps {
  _type: "contact";
  transport: string;
  workingHours: {
    monFri: string;
    sat: string;
    sun: string;
  }
  contact: {
    email: string;
    facebook: string;
    phone: string;
    subtext: string;
    whatsapp: string;
  }
  address: {
    address: string;
    map: string;
    subtext: string;
  }
}

export interface TwoColLayoutProps {
  _type: "twoColLayout";
  title: string;
  reverse?: boolean;
  imageUrl: string;
  content: any[];
}

export interface CenterLayoutProps {
  _type: "centerLayout";
  title: string;
  content: any[];
}

export interface FAQsProps {
  _type: "faq";
  title: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

// Union type for all sections
export type PageSection = 
  | HeroSectionProps 
  | FeatureCardsProps 
  | IntroductionProps 
  | BentoGalleryProps 
  | TestimonialsProps
  | ContactProps
  | TwoColLayoutProps
  | CenterLayoutProps
  | FAQsProps;

// Base section interface
export interface BaseSection {
  _key: string;
  _type: SectionType;
}

// Homepage data interface
export interface HomepageData {
  content: PageSection[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
  };
}

// Page Data
export interface PageData {
  content: PageSection[];
}

// Page params interface
export interface PageParams {
  lang: string;
}