import LanguageBanner from "@/components/language-banner";
import Navbar from "@/components/navbar";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { client } from "@/lib/sanity";
import { NavigationProps } from "@/lib/types";
import { SanityDocument } from "next-sanity";
import { headers } from "next/headers";

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

	return (
		<html lang={lang}>
			<body>
				<LanguageBanner />
				<Navbar navigation={navigation as unknown as NavigationProps} />
				{children}
			</body>
		</html>
	);
}
