import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";

import UnderConstruction from "@/components/under-construction";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.PARENTS);
	return metadata;
}

function ParentsPage() {
	return <UnderConstruction />;
}

export default ParentsPage;
