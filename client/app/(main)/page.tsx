import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";
import { SectionRenderer } from "@/components/section-renderer";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.HOME);
}

export default async function Homepage() {
	const homePage = await getPageData(PAGE_TYPES.HOME);

	return (
		<main>
			<SectionRenderer content={homePage.content} />
		</main>
	);
}
