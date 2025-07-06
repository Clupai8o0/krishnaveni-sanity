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
      },
			_type == "twoColLayout" => {
				"imageUrl": image.asset->url,

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
					_key: "7256177e525d",
					_type: "heroSection",
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
								"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I%E2%80%99d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
							internalPage: undefined,
							label: "Book a School Tour",
							style: "none",
						},
					],
					description:
						"Established in 2017, Krishnaveni School is a recognized Telangana SSC board school focused on affordable education for all families.",
					imageUrl: {
						desktop:
							"https://cdn.sanity.io/images/jzbduz09/production/05f745aaf696ed75e192341f84da7c027eb5aa4d-1680x1120.jpg",
						mobile:
							"https://cdn.sanity.io/images/jzbduz09/production/960c9f6115c323d593f04ae389bd07ea91770cbf-637x896.jpg",
					},
					subtitle: "Best school for values and academics in Hyderabad",
					title: "About Krishnaveni School",
				},
				{
					_type: "visionMission",
					mission: {
						content:
							"To empower every child through a joyful, practical, and disciplined learning environment, rooted in academic fundamentals, life skills, and personal values.",
						title: "Mission",
					},
					title: "Our Vision & Mission",
					vision: {
						content:
							"To provide affordable, values-driven, and quality education tailored to lower and middle-income families, nurturing confident, responsible, and future-ready students.",
						title: "Vision",
					},
				},
				{
					_type: "twoColLayout",
					content: [
						{
							_key: "600e5125749c",
							_type: "block",
							children: [
								{
									_key: "9bdc6183f80d",
									_type: "span",
									marks: [],
									text: "Every student has a story waiting to unfold—our job is just to give them the pen.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_key: "9a918405bc63",
							_type: "block",
							children: [
								{
									_key: "53f227762d3b",
									_type: "span",
									marks: ["em"],
									text: "- V. Kavitha (Principal)",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/9a0e87f56b6d19dde3f0b6f71dc08c0faeb03bf8-723x690.png",
					imageFit: "contain",
					reverse: false,
					title: "Message from our Principal",
				},
				{
					_type: "twoColLayout",
					content: [
						{
							_key: "d7b08562d3fb",
							_type: "block",
							children: [
								{
									_key: "3bd80eaaa2b8",
									_type: "span",
									marks: [],
									text: "Our job is not to prepare students for something. Our job is to help students prepare themselves for anything.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_key: "8816321b0f99",
							_type: "block",
							children: [
								{
									_key: "10fb6bfb9257",
									_type: "span",
									marks: ["em"],
									text: "- P. V. Rajendra Prasad (Chairman)",
								},
								{
									_key: "ea405294c5fc",
									_type: "span",
									marks: [],
									text: "\n",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/2a7605ef91e9e9c33fedb877e7f423dfe9d94eec-780x764.png",
					imageFit: "contain",
					reverse: true,
					title: "Message from our Chairman",
				},
				{
					_type: "twoColLayout",
					content: [
						{
							_key: "5e9de9e0964a",
							_type: "block",
							children: [
								{
									_key: "1c1c0e68e3a6",
									_type: "span",
									marks: [],
									text: "Krishnaveni School, a Peerzadiguda education institution, was founded in 2017 by committed educators. Today, we serve students from Uppal, Boduppal, and beyond — combining local values with modern teaching for confident learners.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_key: "786db91403aa",
							_type: "block",
							children: [
								{
									_key: "b81fd57edf7f",
									_type: "span",
									marks: [],
									text: '"We combine local cultural values with modern teaching to prepare students for a future of confidence and integrity."',
								},
							],
							markDefs: [],
							style: "blockquote",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/410d1cb28c957b81db5179e93ad93177750a484e-1344x896.jpg",
					reverse: false,
					title: "Our Journey Since 2017",
				},
				{
					_type: "uniqueCards",
					cards: [
						{
							color: "2951e0",
							description:
								"Telangana SSC-recognized. High teaching standards at an affordable fee.",
							icon: "indian-rupee",
							title: "Affordable Excellence",
						},
						{
							color: "7AADD9",
							description:
								"Kawiz App, WhatsApp updates, real-time monitoring, and regular PTMs.",
							icon: "heart-handshake",
							title: "Strong Parent–School Connection",
						},
						{
							color: "F92543",
							description: "25:1 ratio, guidance for slow learners.",
							icon: "user-round",
							title: "Personal Attention",
						},
						{
							color: "25DE32",
							description:
								"Activity-based learning, storytelling, digital tools.",
							icon: "shrub",
							title: "Values + Modern Methods",
						},
					],
					title: "What Sets Us Apart",
				},
				{
					_type: "centerLayout",
					content: [
						{
							_key: "5f16e2e49fe4",
							_type: "image",
							asset: {
								_ref: "image-6d5f38b1c93b4b41dac5200ef398064c325879b5-200x200-png",
								_type: "reference",
							},
						},
						{
							_key: "f60703465b45",
							_type: "block",
							children: [
								{
									_key: "ffeb554a8a1f",
									_type: "span",
									marks: [],
									text: "Krishnaveni School is recognized by the Telangana State Education Department and follows the Telangana SSC Board curriculum.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_key: "b0281bef0f58",
							_type: "block",
							children: [
								{
									_key: "08560fcf6d15",
									_type: "span",
									marks: ["em"],
									text: "We are currently preparing to integrate CBSE-based learning for enhanced academic outcomes.",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					title: "Our Recognition",
				},
			],
			seo: {
				metaDescription:
					"Learn about Krishnaveni School, a recognized Telangana SSC board school in Peerzadiguda offering low-cost, values-based education led by passionate founders and educators.",
				metaKeywords:
					"- best school for values and academics in Hyderabad - low-cost school with quality education - Telangana SSC board school - Peerzadiguda education institutions",
				metaTitle:
					"About Krishnaveni School – Best School for Values & Academics in Hyderabad",
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
