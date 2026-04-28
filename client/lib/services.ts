import { PAGE_TYPES, type PageType } from "./constants";
import type { HomepageData, NavigationProps, CTAProps } from "./types";
import { getPageData, getNavigationData, getCTAData } from "./queries";

export class DataService {
	static async getHomepageData(): Promise<HomepageData> {
		return getPageData(PAGE_TYPES.HOME);
	}

	static async getNavigationData(): Promise<NavigationProps> {
		return getNavigationData();
	}

	static async getCTAData(): Promise<CTAProps> {
		return getCTAData();
	}

	static async getPageData(pageType: PageType): Promise<HomepageData> {
		return getPageData(pageType);
	}
}

export class PageUtils {
	static getErrorPageData(): HomepageData {
		return {
			content: [],
			seo: {
				metaTitle: "Error",
				metaDescription: "An error occurred while loading the page",
			},
		};
	}
}
