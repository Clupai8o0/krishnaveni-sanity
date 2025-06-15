"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LanguageBanner = () => {
	const pathname = usePathname();
	const url = pathname.split("/").slice(2).join("/");

	return (
		<div className="w-full h-auto bg-primary text-white py-2 flex justify-center">
			<p>
				View this page in{" "}
				<Link
					href={`/en/${url}`}
					className="font-semibold hover:underline"
				>
					English
				</Link>{" "}
				or{" "}
				<Link
					href={`/hi/${url}`}
					className="font-semibold hover:underline"
				>
					हिन्दी
				</Link>{" "}
				or{" "}
				<Link
					href={`/te/${url}`}
					className="font-semibold hover:underline"
				>
					తెలుగు
				</Link>
			</p>
		</div>
	);
};

export default LanguageBanner;
