import { SanityDocument } from "next-sanity";
import { client } from "./sanity";
import { CTAProps, NavigationProps } from "./types";

const useSanity = process.env.NEXT_PUBLIC_USE_SANITY === "true";

// Common query fragments for reusability
const CTA_BUTTONS_FRAGMENT = `
  "ctaBtns": ctaBtns.buttons[]{
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

export const getNavigationData = async (lang: string) => {
	let navigation: NavigationProps;

	if (useSanity) {
		navigation = await client.fetch<NavigationProps>(NAVIGATION_QUERY, {
			lang,
		});
	} else {
		navigation = {
			cta: {
				label: "Contact Us",
				link: {
					slug: "/en/contact",
				},
			},
			navLinks: [
				{
					label: "Home",
					link: {
						slug: "/en",
					},
				},
				{
					label: "About Us",
					link: {
						slug: "/en/about",
					},
				},
				{
					label: "Academics",
					link: {
						slug: "/en/academics",
					},
				},
				{
					label: "Campus Life",
					link: {
						slug: "/en/campus-life",
					},
				},
				{
					label: "For Parents",
					link: {
						slug: "/en/parents",
					},
				},
				{
					label: "Admissions",
					link: {
						slug: "/en/admissions",
					},
				},
			],
		};
	}

	return navigation;
};

// CTA query
export const CTA_QUERY = `
  *[_type == "cta" && language == $lang][0]{
    title,
    description,
    ${CTA_BUTTONS_FRAGMENT},
    ${IMAGE_URLS_FRAGMENT}
  }
`;

export const getCTAData = async (lang: string) => {
  let cta: CTAProps;

  if (useSanity) {
    cta = await client.fetch<CTAProps>(CTA_QUERY, { lang });
  } else {
    cta = {
			ctaBtns: [
				{
					externalLink: undefined,
					internalPage: {
						slug: "/en/admissions",
					},
					label: "Apply Now",
					style: "primary",
				},
				{
					externalLink:
						"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I’d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
					internalPage: undefined,
					label: "Book a School Tour",
					style: "none",
				},
			],
			description: "Schedule a visit or speak to our admissions team today.",
			imageUrl: {
				desktop:
					"https://cdn.sanity.io/images/jzbduz09/production/d90cf6a6a874201f68243125e7c45ced448a1ae1-1296x864.jpg",
				mobile:
					"https://cdn.sanity.io/images/jzbduz09/production/bba7c6165e83a2cef2d6d3fab6c6130f0dca4b71-517x864.jpg",
			},
			title: "Ready to Learn More?",
		};
  }

  return cta;
}