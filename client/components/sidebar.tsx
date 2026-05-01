"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { NavigationProps } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { generateId } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = ({ navigation }: { navigation: NavigationProps }) => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const isActive = (slug: string) => pathname === slug || (slug !== "/" && pathname.startsWith(slug));

	return (
		<nav className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Menu className="w-8 h-8 stroke-2 text-white" />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader className="pt-24 px-10">
					<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
						<Link href="/" className="flex justify-center" onClick={() => setOpen(false)}>
							<Image
								src="/logo-desktop-light.svg"
								alt="Logo"
								height={100}
								width={200}
							/>
						</Link>
					</SheetHeader>

					<div className="px-9 mt-8 flex items-start h-[60vh]">
						<ul className="flex flex-col gap-6 list-none">
							{navigation.navLinks.map((link) => (
								<li key={generateId()} className="list-none">
									<Link
										href={link.link.slug}
										onClick={() => setOpen(false)}
										className={`uppercase text-2xl transition-all duration-300 ${
											isActive(link.link.slug)
												? "font-semibold opacity-100"
												: "font-light opacity-60 hover:opacity-100 hover:font-semibold"
										}`}
									>
										{link.label}
									</Link>
								</li>
							))}

							<li className="list-none">
								<Link
									href={navigation.cta.link.slug}
									onClick={() => setOpen(false)}
									className="uppercase text-2xl font-light opacity-60 hover:font-semibold hover:opacity-100 transition-all duration-300"
								>
									{navigation.cta.label}
								</Link>
							</li>
						</ul>
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default Sidebar;
