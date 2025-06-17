import { SanityDocument } from "next-sanity";

import { client } from "@/lib/sanity";
import { getMetadata } from "@/lib/metadata";
import { PageParams } from "@/lib/types";
import { PAGE_TYPES } from "@/lib/constants";

import Hero from "@/components/hero";
import FeatureCards from "@/components/feature-cards";
import AtAGlance from "@/components/at-a-glance";
import BentoGallery from "@/components/bento-gallery";
import Testimonials from "@/components/testimonials";

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { lang } = await params;
	const metadata = await getMetadata(lang, PAGE_TYPES.HOME);
	return metadata;
}

async function Homepage({ params }: { params: Promise<PageParams> }) {
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
        },
        _type == "introduction" => {
          "imageUrl": image.asset->url,
          "ctaButtons": ctaBtns.buttons[]{
            label,
            style,
            "internalPage": internalLink->{
              "slug": slug.current
            }
          }
        },
        _type == "bentoGallery" => {
          "imageUrl": images[]{
            label,
            "mobileImage": mobileImage.asset->url,
            "desktopImage": desktopImage.asset->url
          },
          "ctaButtons": ctaBtns.buttons[]{
            label,
            style,
            "internalPage": internalLink->{
              "slug": slug.current
            }
          }
        },
        _type == "testimonials" => {
          "title": title,
          "testimonials": testimonials[]{
            "video": video.asset->url,
            "thumbnail": thumbnail.asset->url,
            "author": author,
            "authorTitle": authorTitle
          }
        }
      }
    }`,
		{ lang, pageType: "home" }
	);

	return (
		<main>
			{homePage.content.map((section: any) => {
				switch (section._type) {
					case "heroSection":
						return <Hero key={section._key} {...section} />;
					case "featureCards":
						return <FeatureCards key={section._key} {...section} />;
					case "introduction":
						return <AtAGlance key={section._key} {...section} />;
					case "bentoGallery":
						return <BentoGallery key={section._key} {...section} />;
					case "testimonials":
						return <Testimonials key={section._key} {...section} />;
					default:
						return null;
				}
			})}
		</main>
	);
}

export default Homepage;
