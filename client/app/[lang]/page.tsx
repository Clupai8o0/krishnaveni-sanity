import { client } from "@/lib/sanity";
import { SanityDocument } from "next-sanity";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

async function Homepage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;

  const homePage = await client.fetch<SanityDocument>(
    `*[_type == "page" && language == $lang && pageType == $pageType][0]{ 
      seo, content[]{
        ...,

        _type == "heroSection" => {
          "imageUrl": images{
            "desktop": desktop.asset->url,
            "mobile": mobile.asset->url
          },
          "ctaButtons": ctaBtns.buttons[]{
            label,
            style,
            externalLink,
            "internalPage": internalLink->{
              "slug": slug.current
            }
          }
        }
      }
    }`,
    { lang, pageType: "home" }
  )

	return (
		<main>
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
