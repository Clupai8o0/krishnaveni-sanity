import { client } from "./sanity";
import { Seo } from "./sanity.types";

export async function getMetadata(
	lang: string,
	pageType: string
): Promise<{
	title: string;
	description: string;
	keywords: string;
}> {
	const metadata = await client.fetch<Seo>(
		`*[_type == "page" && language == $lang && pageType == $pageType][0]{
      "metaTitle": seo.metaTitle,
      "metaDescription": seo.metaDescription,
      "metaKeywords": seo.metaKeywords 
    }`,
		{ lang, pageType }
	);

	return {
		title: metadata.metaTitle || "Krishnaveni School",
		description:
			metadata.metaDescription ||
			"Krishnaveni School Peerzadiguda, Hyderabad, Telangana, India",
		keywords:
			metadata.metaKeywords ||
			"Krishnaveni School, Peerzadiguda, Hyderabad, Telangana, India",
	};
}
