import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";
import { SectionRenderer } from "@/components/section-renderer";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.ACHIEVEMENTS);
}

export default async function AchievementsPage() {
	const page = await getPageData(PAGE_TYPES.ACHIEVEMENTS);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<SectionRenderer content={page.content} />
		</main>
	);
}
