import { PageType } from "./constants";
import { client } from "./sanity";
import { CTAProps, HomepageData, NavigationProps } from "./types";

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

export const getPageData = async (lang: string, pageType: PageType) => {
	let homepage: HomepageData;

	if (useSanity) {
		homepage = await client.fetch<HomepageData>(HOMEPAGE_QUERY, {
			lang,
			pageType,
		});
	} else {
		homepage = {
			content: [
				{
					_key: "2dba660d7d23",
					_type: "heroSection",
					ctaBtns: [
						{
							externalLink: "tel:+919963373679",
							internalPage: undefined,
							label: "Call Now",
							style: "primary",
						},
						{
							externalLink:
								"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I’d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
							internalPage: undefined,
							label: "Visit School",
							style: "outline",
						},
					],
					description:
						"Visit us at Peerzadiguda, Hyderabad or call now to speak with our admissions team about enrollment for Nursery to Class 8",
					imageUrl: {
						desktop:
							"https://cdn.sanity.io/images/jzbduz09/production/d70d5b265bccd15413025d7373389ca376eba00f-1296x864.jpg",
						mobile:
							"https://cdn.sanity.io/images/jzbduz09/production/39a90caa7591aff18d2ae6e35cb2ecb1319fc8b9-435x731.jpg",
					},
					title: "We’re Here to Help You Get Started",
				},
				{
					_type: "contact",
					address: {
						address:
							"Krishnaveni School Peerzadiguda Main Road Hyderabad – 500098 Telangana, India",
						map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50260804.070813!2d103.3194165631587!3d3.006131546229591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9efcda041387%3A0xf6d6e640790d1d31!2sKrishnaveni%20School!5e0!3m2!1sen!2sau!4v1750594531558!5m2!1sen!2sau",
						subtext: "Located minutes from Uppal and Boduppal",
					},
					contact: {
						email: "ktspeerzadiguda97@gmail.com",
						facebook: "https://www.facebook.com/krishnaveni.peerzadiguda.7",
						phone: "+919963373679",
						subtext:
							"Call us at the number above or use the form below to schedule a school tour or admission consultation. Let us know how we can help. We’ll get back to you shortly.",
						whatsapp:
							"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I%E2%80%99d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
					},
					transport:
						"We offer transportation services to nearby areas including Uppal, Boduppal, and Medipally. >  >  > Ask about routes and pick-up points during your call or visit. >",
					workingHours: {
						monFri: "8:30AM — 3:00PM",
						sat: "8:30AM — 12:30PM",
						sun: "Closed",
					},
				},
			],
			seo: {
				metaDescription:
					"Get in touch with Krishnaveni School in Peerzadiguda. Call for school admissions, schedule a visit, or ask about transport. Serving families from Uppal to Medipally.",
				metaKeywords:
					"- school contact Peerzadiguda Hyderabad - call for school admissions Telangana - visit Krishnaveni School location - school with transport in Hyderabad",
				metaTitle:
					"Contact Krishnaveni School – Peerzadiguda, Hyderabad | Call for Admissions",
			},
		};
	}

	return homepage;
};

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
};
