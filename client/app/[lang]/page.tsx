import { PageParams } from "@/lib/types";
import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";

import { SectionRenderer } from "@/components/section-renderer";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.HOME);
	return metadata;
}

async function Homepage({ params }: { params: Promise<PageParams> }) {
	const { lang } = await params;

	const homePage = await getPageData(lang, PAGE_TYPES.HOME);

	return (
		<main>
			<SectionRenderer content={homePage.content} />
		</main>
	);
}

export default Homepage;
