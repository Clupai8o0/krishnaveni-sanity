import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";
import { SectionRenderer } from "@/components/section-renderer";
import { sanityClient, FACILITIES_QUERY } from "@/lib/sanity-client";
import type { FacilitiesShowcaseProps } from "@/lib/types";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.FACILITIES);
}

export default async function FacilitiesPage() {
	const [page, facilitiesFromSanity] = await Promise.all([
		getPageData(PAGE_TYPES.FACILITIES),
		sanityClient.fetch(FACILITIES_QUERY),
	]);

	const content =
		facilitiesFromSanity?.length > 0
			? page.content.map((section) => {
					if (section._type === "facilitiesShowcase") {
						return {
							...(section as FacilitiesShowcaseProps),
							cards: facilitiesFromSanity,
						};
					}
					return section;
				})
			: page.content;

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<SectionRenderer content={content} />
		</main>
	);
}
