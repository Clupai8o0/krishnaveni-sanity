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
	const metadata = await getMetadata(lang, PAGE_TYPES.CONTACT);
	return metadata;
}

async function ContactPage({ params }: { params: Promise<PageParams> }) {
	const { lang } = await params;

	const contactPageData = await getPageData(lang, "contact");

	return (
		<main className="flex flex-col gap-10 lg:gap-20 mb-10 lg:mb-20">
			<SectionRenderer content={contactPageData.content} />
		</main>
	);
}

export default ContactPage;
