import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";

import { SectionRenderer } from "@/components/section-renderer";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.ADMISSION);
	return metadata;
}

async function AdmissionPage({ params }: { params: Promise<PageParams> }) {
	const { lang } = await params;

	const admissionPageData = await getPageData(lang, "admission");

	return (
		<main className="flex flex-col gap-10">
			<SectionRenderer content={admissionPageData.content} />
		</main>
	);
}

export default AdmissionPage;
