import Link from "next/link";
import Image from "next/image";
import React from "react";
import Sidebar from "./sidebar";
import { NavigationProps } from "@/lib/types";
import { generateId } from "@/lib/utils";

const Navbar = ({ navigation, lang }: { navigation: NavigationProps, lang: string }) => {
	return (
		<div className="relative">
			<header className="absolute top-0 left-0 w-full flex justify-center">
				<nav className="max-w-7xl z-20 w-full py-8 px-4 md:px-8 lg:px-16 flex justify-between items-center">
					<div className="flex items-center md:gap-10 lg:gap-16">
						<Link href={`/${lang}`}>
							<Image
								src="/logo-desktop-dark.svg"
								alt="Logo"
								width={150}
								height={20}
							/>
						</Link>
						<div className="hidden md:block">
							<ul className="flex gap-6">
								{navigation.navLinks.map((link) => (
									<li key={generateId()} className="list-outside list-none">
										<Link
											href={link.link.slug}
											className="text-white font-medium opacity-70 hover:opacity-100 transition-all duration-300"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div>
						<Link href={navigation.cta.link.slug} className="hidden md:block">
							<span className="btn btn-outline inline-block">
								{navigation.cta.label}
							</span>
						</Link>
						<Sidebar navigation={navigation} />
					</div>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
