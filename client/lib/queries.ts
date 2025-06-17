// Common query fragments for reusability
const CTA_BUTTONS_FRAGMENT = `
  "ctaButtons": ctaBtns.buttons[]{
    label,
    style,
    externalLink,
    "internalPage": internalLink->{
      "slug": slug.current
    }
  }
`;

const IMAGE_URLS_FRAGMENT = `
  "imageUrl": images{
    "desktop": desktop.asset->url,
    "mobile": mobile.asset->url
  }
`;

const SEO_FRAGMENT = `
  seo{
    metaTitle,
    metaDescription,
    metaKeywords
  }
`;

// Homepage content query
export const HOMEPAGE_QUERY = `
  *[_type == "page" && language == $lang && pageType == $pageType][0]{ 
    ${SEO_FRAGMENT},
    content[]{
      ...,
      _type == "heroSection" => {
        ${IMAGE_URLS_FRAGMENT},
        ${CTA_BUTTONS_FRAGMENT}
      },
      _type == "introduction" => {
        "imageUrl": image.asset->url,
        ${CTA_BUTTONS_FRAGMENT}
      },
      _type == "bentoGallery" => {
        "imageUrl": images[]{
          label,
          "mobileImage": mobileImage.asset->url,
          "desktopImage": desktopImage.asset->url
        },
        ${CTA_BUTTONS_FRAGMENT}
      },
      _type == "testimonials" => {
        "title": title,
        "testimonials": testimonials[]{
          "video": video.asset->url,
          "thumbnail": thumbnail.asset->url,
          "author": author,
          "authorTitle": authorTitle
        }
      }
    }
  }
`;

// Navigation query
export const NAVIGATION_QUERY = `
  *[_type == "navigation" && language == $lang][0]{
    title,
    navLinks[]{
      label,
      "link": link->{
        "slug": slug.current
      }
    },
    cta{
      label,
      "link": link->{
        "slug": slug.current
      }
    }
  }
`;

// CTA query
export const CTA_QUERY = `
  *[_type == "cta" && language == $lang][0]{
    title,
    description,
    ${CTA_BUTTONS_FRAGMENT},
    ${IMAGE_URLS_FRAGMENT}
  }
`; 