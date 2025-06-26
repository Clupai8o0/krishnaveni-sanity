import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";

import { SectionRenderer } from "@/components/section-renderer";
import { getPageData } from "@/lib/queries";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.ABOUT);
	return metadata;
}

async function AboutPage({ params }: { params: Promise<PageParams> }) {
	const { lang } = await params;
	const page = await getPageData(lang, PAGE_TYPES.ABOUT);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<SectionRenderer content={page.content} />
		</main>
	);
}

export default AboutPage;
