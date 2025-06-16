import LanguageBanner from "@/components/language-banner";
import Navbar from "@/components/navbar";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { client } from "@/lib/sanity";
import { CTAProps, NavigationProps } from "@/lib/types";
import { SanityDocument } from "next-sanity";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export async function generateStaticParams() {
	return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;

	const navigation = await client.fetch<SanityDocument>(
		`*[_type == "navigation" && language == $lang][0]{
      "navLinks": navLinks[]{
        "label": label,
        "link": link->{
          "slug": slug.current
        }
      },
      "cta": cta{
        "label": label,
        "link": link->{
          "slug": slug.current
        }
      }
    }`,
		{ lang }
	);

	const cta = await client.fetch<SanityDocument>(
		`*[_type == "cta" && language == $lang][0]{
			"title": title,
			"description": description,
			"ctaBtns": ctaBtns.buttons[]{
				label,
				style,
				"internalPage": internalLink->{
					"slug": slug.current
				},
				externalLink
			},
			"imageUrl": images{
				"desktop": desktop.asset->url,
				"mobile": mobile.asset->url
			}
		}`,
		{ lang }
	);
	console.log(cta);

	return (
		<html lang={lang}>
			<body>
				<LanguageBanner />
				<Navbar navigation={navigation as unknown as NavigationProps} lang={lang} />
				{children}
				<CTA cta={cta as unknown as CTAProps} />
				<Footer navigation={navigation as unknown as NavigationProps} lang={lang} />
			</body>
		</html>
	);
}
