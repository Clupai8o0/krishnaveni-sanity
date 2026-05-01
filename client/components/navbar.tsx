"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { NavigationProps } from "@/lib/types";
import { generateId } from "@/lib/utils";

const Navbar = ({ navigation }: { navigation: NavigationProps }) => {
	const pathname = usePathname();

	const isLight =
		pathname.startsWith("/updates/") && pathname !== "/updates";

	const isActive = (slug: string) => {
		if (slug === "/" || slug === "") return pathname === "/";
		return pathname.startsWith(slug);
	};

	if (isLight) {
		return (
			<header className="fixed top-0 left-0 w-full z-30 bg-white shadow-sm flex justify-center">
				<nav className="max-w-7xl w-full py-5 px-4 md:px-8 lg:px-16 flex justify-between items-center">
					<div className="flex items-center md:gap-10 lg:gap-16">
						<Link href="/">
							<Image src="/logo-desktop-light.svg" alt="Logo" width={150} height={20} />
						</Link>
						<div className="hidden md:block">
							<ul className="flex gap-2">
								{navigation.navLinks.map((link) => (
									<li key={generateId()} className="list-none">
										<Link
											href={link.link.slug}
											className={`font-medium px-3 py-1.5 rounded-md transition-all duration-300 ${
												isActive(link.link.slug)
													? "bg-gray-100 text-gray-900"
													: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
											}`}
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
							<span className="btn btn-primary inline-block">{navigation.cta.label}</span>
						</Link>
						<Sidebar navigation={navigation} variant="light" />
					</div>
				</nav>
			</header>
		);
	}

	return (
		<div className="relative">
			<header className="absolute top-0 left-0 w-full flex justify-center">
				<nav className="max-w-7xl z-20 w-full py-8 px-4 md:px-8 lg:px-16 flex justify-between items-center">
					<div className="flex items-center md:gap-10 lg:gap-16">
						<Link href="/">
							<Image src="/logo-desktop-dark.svg" alt="Logo" width={150} height={20} />
						</Link>
						<div className="hidden md:block">
							<ul className="flex gap-2">
								{navigation.navLinks.map((link) => (
									<li key={generateId()} className="list-none">
										<Link
											href={link.link.slug}
											className={`font-medium px-3 py-1.5 rounded-md transition-all duration-300 ${
												isActive(link.link.slug)
													? "bg-white/20 text-white opacity-100"
													: "text-white opacity-70 hover:opacity-100 hover:bg-white/10"
											}`}
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
							<span className="btn btn-outline inline-block">{navigation.cta.label}</span>
						</Link>
						<Sidebar navigation={navigation} variant="dark" />
					</div>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
