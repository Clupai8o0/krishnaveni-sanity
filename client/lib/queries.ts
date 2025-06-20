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

export const getHomepageData = async (lang: string) => {
	let homepage: HomepageData;

	if (useSanity) {
		homepage = await client.fetch<HomepageData>(HOMEPAGE_QUERY, { lang });
	} else {
		homepage = {
			content: [
				{
					_key: "d968bb0441bb",
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
								"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I’d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
							internalPage: undefined,
							label: "Book a School Tour",
							style: "none",
						},
					],
					description:
						"Krishnaveni School in Peerzadiguda offers affordable, English-medium education rooted in local values and life skills.",
					imageUrl: {
						desktop:
							"https://cdn.sanity.io/images/jzbduz09/production/dfc7e6918a11671c8b0af4dc92ec483993181ebc-1944x1296.jpg",
						mobile:
							"https://cdn.sanity.io/images/jzbduz09/production/9d59dc8a0666915240673a85403c8e5618e4ef26-982x1728.jpg",
					},
					subtitle:
						"Empowering Future-Ready Students with Strong Academics & Life Skills",
					title: "Affordable, Values Driven Education in Peerzadiguda",
				},
				{
					_key: "5d9ff123e715",
					_type: "featureCards",
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
							description: "Kawiz App, WhatsApp updates, real-time monitoring.",
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
					title: "Why Choose Krishnaveni?",
				},
				{
					_key: "86608f601875",
					_type: "introduction",
					ctaBtns: [
						{
							internalPage: {
								slug: "/en/about",
							},
							label: "Learn More",
							style: "primary",
						},
						{
							internalPage: {
								slug: "/en/contact",
							},
							label: "Contact Us",
							style: "none",
						},
					],
					description:
						"Krishnaveni School is a trusted choice among Peerzadiguda education institutions, offering affordable, values-based learning for children from Nursery to Class 8. With a strong focus on both academics and life skills, our school blends modern teaching methods with local cultural roots to create a well-rounded educational experience for every child.",
					facts: [
						{
							description: "Nursery to Class 8 (Class 10 coming soon)",
							icon: "graduation-cap",
							title: "Grades Offered",
						},
						{
							description: "Telangana SSC / CBSE ",
							icon: "school",
							title: "Board Affiliation",
						},
						{
							description: "Peerzadiguda – serving Uppal, Boduppal, Medipally",
							icon: "map-pin",
							title: "Location",
						},
						{
							description:
								"English (Primary), Telugu & Hindi (2nd/3rd languages)",
							icon: "languages",
							title: "Medium of Instruction",
						},
					],
					imageUrl:
						"https://cdn.sanity.io/images/jzbduz09/production/ff8fe8440d1863a65f913bd775bd34a88dd8de21-1296x864.png",
					title: "At a Glance",
				},
				{
					_key: "22761bedc0a8",
					_type: "bentoGallery",
					ctaBtns: [
						{
							internalPage: {
								slug: "/en/campus-life",
							},
							label: "View More",
							style: "primary",
						},
					],
					imageUrl: [
						{
							desktopImage:
								"https://cdn.sanity.io/images/jzbduz09/production/9e7b329421e0056883e25f3eaecb17cbfd093717-684x456.jpg",
							label: "Our Events",
							mobileImage:
								"https://cdn.sanity.io/images/jzbduz09/production/9e7b329421e0056883e25f3eaecb17cbfd093717-684x456.jpg",
						},
						{
							desktopImage:
								"https://cdn.sanity.io/images/jzbduz09/production/a5c450f591ab829be0b1937ce50230720f9883d8-1134x1911.jpg",
							label: "Our Transport Facilities",
							mobileImage:
								"https://cdn.sanity.io/images/jzbduz09/production/92a0997c93b19d7be075711ef2a1a94e8d9dcd65-567x956.jpg",
						},
						{
							desktopImage:
								"https://cdn.sanity.io/images/jzbduz09/production/1ddc427bf3123be354607e1d93a2b4d2015c0aca-1680x1120.jpg",
							label: "Our Activities",
							mobileImage:
								"https://cdn.sanity.io/images/jzbduz09/production/2a00171dc41291d453add674d2eee3cebd5c3b10-461x836.jpg",
						},
						{
							desktopImage:
								"https://cdn.sanity.io/images/jzbduz09/production/61b8eb8ce04daa82e80d19752ccdac4b5cdb89bf-840x560.jpg",
							label: "Our Classrooms",
							mobileImage:
								"https://cdn.sanity.io/images/jzbduz09/production/61b8eb8ce04daa82e80d19752ccdac4b5cdb89bf-840x560.jpg",
						},
					],
					title: "Explore Our Campus Life",
				},
				{
					_key: "02621ce4e321",
					_type: "testimonials",
					testimonials: [
						{
							author: "Sharon Pappala",
							authorTitle: "Student",
							thumbnail:
								"https://cdn.sanity.io/images/jzbduz09/production/2e40a5098d5c8b1f0ff5acee705601de6867a416-609x874.png",
							video:
								"https://cdn.sanity.io/files/jzbduz09/production/aa81364686076dd09d45c3151c46a3818cab4990.mp4",
						},
						{
							author: "Abinya",
							authorTitle: "Student",
							thumbnail:
								"https://cdn.sanity.io/images/jzbduz09/production/49cfc84f46533bf877ff007f22932a7a90ca86fd-607x674.png",
							video:
								"https://cdn.sanity.io/files/jzbduz09/production/cbf44912408097afb82cd744a5a7e6838ebc7108.mp4",
						},
						{
							author: "Priya Jha",
							authorTitle: "Teacher",
							thumbnail:
								"https://cdn.sanity.io/images/jzbduz09/production/3e2b987b15cd1edfd47be527997a6ffc47e71e4f-604x688.png",
							video:
								"https://cdn.sanity.io/files/jzbduz09/production/a159e0164e8bcabedafd589b7a8dd95c05f9aca5.mp4",
						},
						{
							author: "Yamuna",
							authorTitle: "Parent",
							thumbnail:
								"https://cdn.sanity.io/images/jzbduz09/production/890f7ff4aa2e0deafe63cf6387d6f5bfecba3fa8-607x761.png",
							video:
								"https://cdn.sanity.io/files/jzbduz09/production/195a82cb28c8e3cb392a69d412d52c121df05f10.mp4",
						},
					],
					title: "Why Choose Us?",
				},
			],
			seo: {
				metaDescription:
					"Krishnaveni School offers affordable, values-based education in Peerzadiguda. Recognized by Telangana SSC Board. Small class sizes, activity-based learning, and strong parent communication.",
				metaKeywords:
					"- affordable English medium school in Peerzadiguda - best school near Uppal or Boduppal - values-based school in Hyderabad - Telangana SSC school admissions - activity-based learning school",
				metaTitle:
					"Affordable English Medium School in Peerzadiguda – Krishnaveni School",
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
