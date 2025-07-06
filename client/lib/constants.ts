export const SUPPORTED_LANGUAGES = ["en", "hi", "te"];

export const LANGUAGES = ["en", "te"] as const;

// Section Types
export const SECTION_TYPES = {
  HERO: "heroSection",
  FEATURE_CARDS: "featureCards", 
  INTRODUCTION: "introduction",
  BENTO_GALLERY: "bentoGallery",
  TESTIMONIALS: "testimonials",
  CONTACT: "contact",
  TWO_COL_LAYOUT: "twoColLayout",
  CENTER_LAYOUT: "centerLayout",
  FAQ: "faq",
  VISION_MISSION: "visionMission",
} as const;

// Page Types  
export const PAGE_TYPES = {
  HOME: "home",
  ABOUT: "about", 
  ACADEMICS: "academics",
  ADMISSION: "admission",
  CAMPUS_LIFE: "campusLife",
  CONTACT: "contact",
  PARENTS: "parents",
} as const;

export type SectionType = typeof SECTION_TYPES[keyof typeof SECTION_TYPES];
export type PageType = typeof PAGE_TYPES[keyof typeof PAGE_TYPES];
