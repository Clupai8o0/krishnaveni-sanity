import { client } from "@/lib/sanity";
import { SanityDocument } from "next-sanity";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

async function Homepage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
  console.log(lang)

  const homePage = await client.fetch<SanityDocument>(
    `*[_type == "page" && language == $lang && pageType == $pageType][0]{ 
      seo, content[]{
        "imageUrl": image.asset->url,
        ...
      }
    }`,
    { lang, pageType: "home" }
  )
  console.log(homePage)

	return (
		<main>
			<Navbar />
			{homePage.content.map((section: any) => {
        switch (section._type) {
          case "heroSection":
            return <Hero key={section._key} {...section} />
          default:
            return null;
        }
      })}
		</main>
	);
}

export default Homepage;
