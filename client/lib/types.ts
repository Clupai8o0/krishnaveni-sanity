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
  ctaBtns: {
    label: string;
    style: "primary" | "secondary" | "outline" | "none";
    internalPage?: {
      slug: string;
    },
    externalLink?: string;
  }[]
  imageUrl: {
    desktop: string;
    mobile: string;
  }
}

// Common interfaces
export interface CTAButton {
  label: string;
  style: "primary" | "secondary" | "outline";
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
  subtitle: string;
  description: string;
  imageUrl: ImageUrls;
  ctaButtons: CTAButton[];
}

export interface FeatureCardsProps {
  _key: string;
  _type: "featureCards";
  title: string;
  cards: {
    title: string;
    description: string;
    icon: string;
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
    icon: string;
  }[];
  ctaButtons: CTAButton[];
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
  ctaButtons: CTAButton[];
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

// Union type for all sections
export type PageSection = 
  | HeroSectionProps 
  | FeatureCardsProps 
  | IntroductionProps 
  | BentoGalleryProps 
  | TestimonialsProps;

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

// Page params interface
export interface PageParams {
  lang: string;
}