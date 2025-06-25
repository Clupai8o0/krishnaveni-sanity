import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "./ui/sheet";
import { NavigationProps } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { generateId } from "@/lib/utils";

const Sidebar = ({ navigation }: { navigation: NavigationProps }) => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger>
					<Menu className="w-8 h-8 stroke-2 text-white" />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader className="pt-24 px-10">
						<Link href="/" className="flex justify-center">
							<Image
								src="/logo-desktop-light.svg"
								alt="Logo"
								height={100}
								width={200}
							/>
						</Link>
					</SheetHeader>

					<div className="px-9 mt-8 flex items-start h-[60vh]">
						<ul className="flex flex-col gap-6">
							{navigation.navLinks.map((link) => (
								<li key={generateId()} className="list-outside list-none">
									<Link
										href={link.link.slug}
										className="uppercase text-2xl font-light opacity-80 hover:font-semibold hover:opacity-100 transition-all duration-300"
									>
										{link.label}
									</Link>
								</li>
							))}

							<li>
								<Link
									href={navigation.cta.link.slug}
									className="uppercase text-2xl font-light opacity-80 hover:font-semibold hover:opacity-100 transition-all duration-300"
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
