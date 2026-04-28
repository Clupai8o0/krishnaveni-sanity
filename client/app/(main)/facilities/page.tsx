import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";
import { SectionRenderer } from "@/components/section-renderer";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.FACILITIES);
}

export default async function FacilitiesPage() {
	const page = await getPageData(PAGE_TYPES.FACILITIES);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<SectionRenderer content={page.content} />
		</main>
	);
}
