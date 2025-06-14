import Link from "next/link";
import React from "react";

interface Props {
	page: string;
}

const LanguageBanner = ({ page }: Props) => {
	return (
		<div className="w-full h-auto bg-primary text-white py-4 flex justify-center">
			<p>
				View this page in <Link href={`/en${page}`}>English</Link> or{" "}
				<Link href={`/hi${page}`}>हिन्दी</Link> or{" "}
				<Link href={`/te${page}`}>తెలుగు</Link>
			</p>
		</div>
	);
};

export default LanguageBanner;
