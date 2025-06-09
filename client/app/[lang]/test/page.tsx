import { client } from "@/lib/sanity"
import { SanityDocument } from "next-sanity";


async function TestLangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  console.log(lang);

  const testPage = await client.fetch<SanityDocument>(
    `*[_type == "test" && language == $lang][0]{ title }`,
    { lang }
  )
  console.log(testPage)

	// const translations = await sanityClient.fetch(
	// 	`*[_type=='translation.metadata' && references($id)].translations[].value->{language, "slug": slug.current}`,
	// 	{ id: page._id }
	// );

	return (
		<main>
      <h1 className="text-3xl font-bold underline m-8">
        {testPage !== null ? testPage.title : "Something went wrong"}
      </h1>
			{/* render a language switcher using translations */}
		</main>
	);
}

export default TestLangPage