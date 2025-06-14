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