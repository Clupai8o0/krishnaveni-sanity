import { SanityDocument } from "next-sanity";

import { client } from "@/lib/sanity";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { CTAProps, NavigationProps } from "@/lib/types";
import {
	CTA_QUERY,
	getCTAData,
	getNavigationData,
	NAVIGATION_QUERY,
} from "@/lib/queries";

import CTA from "@/components/cta";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LanguageBanner from "@/components/language-banner";

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

	const navigation = await getNavigationData(lang);
	const cta = await getCTAData(lang);

	return (
		<html lang={lang}>
			<body>
				<LanguageBanner />
				<Navbar navigation={navigation} lang={lang} />
				{children}
				<CTA cta={cta} />
				<Footer navigation={navigation} lang={lang} />
			</body>
		</html>
	);
}
