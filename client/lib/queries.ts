import { PageType } from "./constants";
import { CTAButton, CTAProps, HomepageData, MessagePageData, NavigationProps } from "./types";
import { pageData, messageData, navigationData, ctaData } from "./data/index";

function fixSlug(slug: string): string {
	return slug.replace(/^\/en/, "") || "/";
}

function fixCTAButtons(ctaBtns?: CTAButton[]): CTAButton[] | undefined {
	return ctaBtns?.map((btn) => ({
		...btn,
		internalPage: btn.internalPage ? { slug: fixSlug(btn.internalPage.slug) } : undefined,
	}));
}

export const getPageData = async (pageType: PageType): Promise<HomepageData> => {
	const data = pageData["en"][pageType];
	return {
		...data,
		content: data.content.map((section) => {
			if ("ctaBtns" in section && section.ctaBtns) {
				return { ...section, ctaBtns: fixCTAButtons(section.ctaBtns) ?? [] };
			}
			return section;
		}) as HomepageData["content"],
	};
};

export const getMessagePageData = async (pageType: PageType): Promise<MessagePageData> => {
	return messageData["en"][pageType];
};

export const getNavigationData = async (): Promise<NavigationProps> => {
	const nav = navigationData["en"];
	return {
		...nav,
		cta: { ...nav.cta, link: { slug: fixSlug(nav.cta.link.slug) } },
		navLinks: [
			...nav.navLinks.map((link) => ({
				...link,
				link: { slug: fixSlug(link.link.slug) },
			})),
			{ label: "Updates", link: { slug: "/updates" } },
		],
	};
};

export const getCTAData = async (): Promise<CTAProps> => {
	const cta = ctaData["en"];
	return {
		...cta,
		ctaBtns: fixCTAButtons(cta.ctaBtns) ?? [],
	};
};
