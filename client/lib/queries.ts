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
					_key: "907529e97004",
					_type: "heroSection",
					ctaBtns: undefined	,
					description:
						"Admissions are open for Nursery to Class 8 with expansion to Class 10 underway — enroll early to reserve your seat!",
					imageUrl: {
						desktop:
							"https://cdn.sanity.io/images/jzbduz09/production/c251db31dbbb7ad8868f6c6c4c06fbc9afaa4833-1296x864.jpg",
						mobile:
							"https://cdn.sanity.io/images/jzbduz09/production/bc6306a0879e1eabff22bf25f8bec24f053bfce6-428x691.jpg",
					},
					subtitle:
						"Looking for a school that blends academic excellence, local values, and affordability?",
					title: "Why Choose Krishnaveni?",
				},
				{
					_type: "twoColLayout",
					reverse: false,
					content: [
						{
							_type: "block",
							children: [
								{
									_type: "span",
									marks: [],
									text: "Our simple admission process involves a walk-in or phone inquiry, followed by a brief parent–child interaction with the Principal.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_type: "block",
							children: [
								{
									_type: "span",
									marks: ["strong"],
									text: "Inquiry",
								},
								{
									_type: "span",
									marks: [],
									text: " – Walk in or call us",
								},
							],
							level: 1,
							listItem: "number",
							markDefs: [],
							style: "normal",
						},
						{
							_type: "block",
							children: [
								{
									_type: "span",
									marks: ["strong"],
									text: "Registration",
								},
								{
									_type: "span",
									marks: [],
									text: " – Fill the basic form",
								},
							],
							level: 1,
							listItem: "number",
							markDefs: [],
							style: "normal",
						},
						{				
							_type: "block",
							children: [
								{
									_type: "span",
									marks: ["strong"],
									text: "Interaction",
								},
								{
									_type: "span",
									marks: [],
									text: " – Meet with Principal or coordinator",
								},
							],
							level: 1,
							listItem: "number",
							markDefs: [],
							style: "normal",
						},
						{
							_key: "90b2b3a2ecda",
							_type: "block",
							children: [
								{
									_key: "7b80a588cb08",
									_type: "span",
									marks: ["strong"],
									text: "Confirmation",
								},
								{
									_key: "0e9e20babbb0",
									_type: "span",
									marks: [],
									text: " – Submit documents, confirm admission",
								},
							],
							level: 1,
							listItem: "number",
							markDefs: [],
							style: "normal",
						},
						{
							_key: "e02d1552cdf0",
							_type: "block",
							children: [
								{
									_key: "79329d10d258",
									_type: "span",
									marks: ["em"],
									text: "No entrance test for Nursery to Class 1 – admission is on first-come, first-served basis.",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/2b30fa781fd01af6b8dfe7336e29ac75d31b650f-768x768.png",
					title: "How to Apply",
				},
				{
					_type: "centerLayout",
					content: [
						{
							_type: "block",
							children: [
								{
									_key: "760e5ae1b405",
									_type: "span",
									marks: [],
									text: "Children aged 2.5 years and above can join Nursery without formal tests.",
								},
							],
							markDefs: [],
							style: "normal",
						},
						{
							_key: "1b51b3df2fe5",
							_type: "table",
							rows: [
								{
									_key: "71556776-e993-4ed8-b0ff-0e112b7c7054",
									_type: "tableRow",
									cells: ["Grade", "Age Requirement"],
								},
								{
									_key: "62166198-5b9a-44b7-a8c2-0cb7dc7c5c88",
									_type: "tableRow",
									cells: ["Nursery", "2.5+ years"],
								},
								{
									_key: "8c2ac581-993e-46cb-b7d7-5d91ebdd148a",
									_type: "tableRow",
									cells: ["LKG", "3.5+ years"],
								},
								{
									_key: "4644df65-9fcb-49ce-81d9-6c61c0f50f3a",
									_type: "tableRow",
									cells: ["UKG", "4.5+ years"],
								},
								{
									_key: "e7d3c0e2-6fb7-4625-a1d9-8a0ee7f36a00",
									_type: "tableRow",
									cells: ["Class 1", "5.5+ years"],
								},
							],
						},
					],
					title: "Eligibility by Age",
				},
				{
					_type: "twoColLayout",
					content: [
						{
							_type: "block",
							children: [
								{
									_type: "span",
									marks: [],
									text: "Child's Birth Certificate",
								},
							],
							level: 1,
							listItem: "bullet",
							markDefs: [],
							style: "normal",
						},
						{
							_type: "block",
							children: [
								{
									_type: "span",
									marks: [],
									text: "Aadhaar Card (Parent & Child)",
								},
							],
							level: 1,
							listItem: "bullet",
							markDefs: [],
							style: "normal",
						},
						{
							_type: "block",
							children: [
								{
									_key: "9e4d4b407541",
									_type: "span",
									marks: [],
									text: "2 Passport Photos (each)",
								},
							],
							level: 1,
							listItem: "bullet",
							markDefs: [],
							style: "normal",
						},
						{
							_key: "bc666694827d",
							_type: "block",
							children: [
								{
									_key: "a11b9e37293d",
									_type: "span",
									marks: [],
									text: "Transfer Certificate (if applicable)",
								},
							],
							level: 1,
							listItem: "bullet",
							markDefs: [],
							style: "normal",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/21485e47a9637f89dfc596ece31d52da6d279a16-768x768.png",
					reverse: true,
					title: "What to Bring?",
				},
				{
					_type: "centerLayout",
					content: [
						{
							_key: "58a68a86029a",
							_type: "block",
							children: [
								{
									_key: "ada11e758a29",
									_type: "span",
									marks: [],
									text: "We share fee details directly during the campus visit or through the Kawiz App for enrolled parents. We do not publish fee tables online to ensure fairness and protect family privacy",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					title: "Fees & Transparency",
				},
				{
					_type: "centerLayout",
					content: [
						{
							_key: "5d3c34b86cad",
							_type: "block",
							children: [
								{
									_key: "1f16a4a113dc",
									_type: "span",
									marks: [],
									text: "We’re preparing to offer merit-based waivers to high-performing and low-income students starting next academic cycle.",
								},
							],
							markDefs: [],
							style: "normal",
						},
					],
					title: "Scholarship Options",
				},
				{
					_type: "faq",
					faqs: [
						{
							answer: "Yes, if seats are available.",
							question: "Do you accept mid-year admissions?",
						},
						{
							answer:
								"English, with Telugu and Hindi as second/third languages.",
							question: "What’s the medium of instruction?",
						},
						{
							answer: "Yes, we run buses to Uppal and Boduppal.",
							question: "Is transport available?",
						},
					],
					title: "Common Questions",
				},
			],
			seo: {
				metaDescription:
					"Learn how to apply to Krishnaveni School in Peerzadiguda. English medium nursery admissions, no entrance test, simple process, and trusted SSC board affiliation.",
				metaKeywords:
					"- how to apply to schools in Peerzadiguda - admission age for nursery in Hyderabad - school admission process Telangana - schools accepting new students in Hyderabad - English medium nursery admissions",
				metaTitle:
					"Admissions – English Medium School in Peerzadiguda | Krishnaveni School",
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
