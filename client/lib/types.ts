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
    }
  }[]
}