import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.ACADEMICS);
	return metadata;
}

function AcademicsPage() {
  return (
    <div>AcademicsPage</div>
  )
}

export default AcademicsPage