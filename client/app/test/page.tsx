import { type SanityDocument } from "@sanity/client";

import { client } from "@/lib/sanity";

const TEST_QUERY = `*[_type == "test"]`;

async function TestPage() {
	const data = await client.fetch<SanityDocument[]>(TEST_QUERY);

	console.log(data);

	return (
		<h1 className="text-3xl font-bold underline m-8">
			{data !== null && data.length > 0
				? data.map((item) => item.title)
				: "Something went wrong"}
		</h1>
	);
}

export default TestPage;
