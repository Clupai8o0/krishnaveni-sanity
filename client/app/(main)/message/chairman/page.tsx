import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getMessagePageData } from "@/lib/queries";
import MessageLayout from "@/components/message-layout";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.CHAIRMAN_MESSAGE);
}

export default async function ChairmanMessagePage() {
	const data = await getMessagePageData(PAGE_TYPES.CHAIRMAN_MESSAGE);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<MessageLayout {...data} />
		</main>
	);
}
