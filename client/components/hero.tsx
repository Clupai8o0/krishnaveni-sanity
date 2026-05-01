import { HeroSectionProps } from "@/lib/types";
import { generateId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { Facebook, Youtube, Instagram } from "lucide-react";

//todo: JSON-LD

const Hero = ({
	title,
	subtitle,
	imageUrl,
	description,
	ctaBtns,
}: HeroSectionProps) => {
	return (
		<section
			id="hero"
			className="w-full h-auto overflow-hidden pt-40 pb-30 relative"
		>
			<div className="max-w-4xl mx-auto relative z-10 text-white flex flex-col items-center justify-center px-4">
				<h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{title}
				</h1>
				<h2 className="text-xl md:text-2xl max-w-2xl text-center text-balance md:text-pretty leading-tight mt-3 mb-6 opacity-80">
					{subtitle}
				</h2>
				<div className={clsx("flex flex-col md:flex-row gap-2", !ctaBtns && "hidden")}>
					{ctaBtns?.map((btn) => {
						return (
							<Link
								key={generateId()}
								className={`${btn.style === "primary" ? "btn-primary" : btn.style === "secondary" ? "btn-secondary" : btn.style === "outline" ? "btn-outline" : "btn-none"} btn`}
								href={btn.externalLink || btn.internalPage?.slug || ""}
								target={btn.externalLink ? "_blank" : "_self"}
							>
								{btn.label}
							</Link>
						);
					})}
				</div>
				<p className="text-base md:text-lg text-center mt-4 max-w-2xl opacity-70 text-balance">
					{description}
				</p>
				<div className="flex gap-5 mt-8">
					<Link
						href="https://www.facebook.com/krishnaveni.peerzadiguda.7"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
						className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-85 transition-opacity duration-200"
					>
						<Facebook size={28} strokeWidth={1.5} />
					</Link>
					<Link
						href="https://www.youtube.com/@krishnavenischoolpeerzadig1274"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="YouTube"
						className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-85 transition-opacity duration-200"
					>
						<Youtube size={28} strokeWidth={1.5} />
					</Link>
					<Link
						href="https://www.instagram.com/schoolkrishnaveni/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="w-16 h-16 rounded-full bg-[#E1306C] flex items-center justify-center hover:opacity-85 transition-opacity duration-200"
					>
						<Instagram size={28} strokeWidth={1.5} />
					</Link>
				</div>
			</div>

			<div className="absolute bg-black opacity-70 w-full h-full z-[2] top-0 left-0"></div>
			<Image
				src={imageUrl.desktop}
				alt="Hero Background"
				fill
				className="object-cover absolute w-full h-full z-[1] hidden md:block"
			/>
			<Image
				src={imageUrl.mobile}
				alt="Hero Background"
				fill
				className="object-cover absolute w-full h-full z-[1] block md:hidden"
			/>
		</section>
	);
};

export default Hero;
