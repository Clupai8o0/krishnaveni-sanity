import { NavigationProps } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { generateId } from "@/lib/utils";
import Image from "next/image";

const Footer = ({
	navigation,
	lang,
}: {
	navigation: NavigationProps;
	lang: string;
}) => {
	return (
		<footer className="bg-primary py-12 md:py-18 w-full px-4 md:px-8 lg:px-16">
			<div className="max-w-7xl flex flex-col items-start justify-center w-full">
				<div className="md:flex md:items-center gap-6">
					<Link href={`/${lang}`} className="flex items-start mb-4 sm:mb-0">
						<Image
							src="/logo-mobile-dark.svg"
							alt="Logo"
							width={40}
							height={40}
							className="md:hidden"
						/>
						<Image
							src="/logo-desktop-dark.svg"
							alt="Logo"
							width={150}
							height={20}
							className="hidden md:block"
						/>
					</Link>

					<div className="flex flex-col md:flex-row gap-y-3 xl:gap-y-0 gap-x-4 xl:gap-x-8 text-white mt-6 md:mt-0 xl:mt-4 list-none">
						{navigation.navLinks.map((link) => (
							<li key={generateId()}>
								<Link
									href={link.link.slug}
									className="text-white font-medium opacity-70 hover:opacity-100 transition-all duration-300"
								>
									{link.label}
								</Link>
							</li>
						))}
					</div>
				</div>

				<hr className="my-6 border-white/10 border-t w-full sm:mx-auto xl:my-8" />

				<div className="sm:flex sm:items-center sm:justify-start">
					<span className="text-sm text-white/60 sm:text-center">
						© 2025 Krishnaveni™. All Rights Reserved.
					</span>

					{/* <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
						<a
							href="https://www.instagram.com/nmmun_24/"
							className="text-gray-300 hover:text-white"
						>
							<Facebook className="w-6 h-6" />
							<span className="sr-only">Facebook Page</span>
						</a>
						<a
							href="mailto:nmmun2024.25@gmail.com"
							className="text-gray-300 hover:text-white"
						>
							<Mail className="w-6 h-6" />
							<span className="sr-only">Email Link</span>
						</a>
					</div> */}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
