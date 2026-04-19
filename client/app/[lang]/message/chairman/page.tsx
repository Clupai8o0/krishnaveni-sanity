import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";
import { getMessagePageData } from "@/lib/queries";
import MessageLayout from "@/components/message-layout";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.CHAIRMAN_MESSAGE);
	return metadata;
}

async function ChairmanMessagePage({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const data = await getMessagePageData(lang, PAGE_TYPES.CHAIRMAN_MESSAGE);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<MessageLayout {...data} />
		</main>
	);
}

export default ChairmanMessagePage;
