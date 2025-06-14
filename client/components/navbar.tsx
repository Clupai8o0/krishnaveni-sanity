import Link from "next/link";
import Image from "next/image";
import React from "react";
import Sidebar from "./sidebar";
import { NavigationProps } from "@/lib/types";

const Navbar = ({ navigation }: { navigation: NavigationProps }) => {
	return (
		<header className="relative w-full">
			<nav className="container absolute top-0 left-0 z-20 w-full py-8 px-4 flex justify-between items-center">
				<div>
					<Link href="/">
						<Image
							src="/logo-mobile-dark.svg"
							alt="Logo"
							width={40}
							height={40}
						/>
					</Link>
					<div className="hidden md:block">
						<ul></ul>
					</div>
				</div>

				<div>
					{/* <a href=""></a> */}
					<Sidebar navigation={navigation} />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
