import { PageType } from "./constants";
import { pageData, messageData } from "./data/index";

export async function getMetadata(pageType: PageType) {
	const pageSeo = pageData["en"]?.[pageType]?.seo;
	const msgSeo = messageData["en"]?.[pageType]?.seo;
	const seo = pageSeo ?? msgSeo;

	return {
		title: seo?.metaTitle || "Krishnaveni School",
		description:
			seo?.metaDescription ||
			"Krishnaveni School Peerzadiguda, Hyderabad, Telangana, India",
		keywords:
			seo?.metaKeywords ||
			"Krishnaveni School, Peerzadiguda, Hyderabad, Telangana, India",
	};
}
