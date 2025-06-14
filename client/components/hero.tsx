import { generateId } from "@/lib/utils";
import { Image } from "next-sanity/image";
import Link from "next/link";
import React from "react";

//todo: JSON-LD

interface Props {
	title: string;
	subtitle: string;
	imageUrl: {
		desktop: string;
		mobile: string;
	}
	description: string;
	ctaButtons: {
		style: "primary" | "secondary" | "outline";
		label: string;
		internalPage?: {
			slug: string;
		};
		externalLink?: string;
	}[];
}

const Hero = ({
	title,
	subtitle,
	imageUrl,
	description,
	ctaButtons,
}: Props) => {
	return (
		<section
			id="hero"
			className="w-full h-auto overflow-hidden rounded-b-[3rem] md:rounded-b-[4em] pt-40 pb-30 relative"
		>
			<div className="max-w-4xl mx-auto relative z-10 text-white flex flex-col items-center justify-center px-4">
				<h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{title}
				</h1>
				<h2 className="text-xl md:text-2xl max-w-2xl text-center text-balance md:text-pretty leading-tight mt-3 mb-6 opacity-80">
					{subtitle}
				</h2>
				<div className="flex flex-col md:flex-row gap-2">
					{ctaButtons.map((btn) => {
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
