import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

const merriweather = Merriweather({
	variable: "--font-serif",
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
});

const openSans = Open_Sans({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title:
		"Affordable English Medium School in Peerzadiguda – Krishnaveni School",
	description:
		" Krishnaveni School offers affordable, values-based education in Peerzadiguda. Recognized by Telangana SSC Board. Small class sizes, activity-based learning, and strong parent communication.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${merriweather.variable} ${openSans.variable} antialiased`}
			>
				{children}
			</body>

			{isProduction && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
		</html>
	);
}
