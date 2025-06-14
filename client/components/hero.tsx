import { generateId } from "@/lib/utils";
import { Image } from "next-sanity/image";
import React from "react";

//todo: JSON-LD

interface Props {
	title: string;
	subtitle: string;
	imageUrl: string;
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
			className="w-full h-auto overflow-hidden rounded-b-[4em] pt-60 pb-40 relative"
		>
			<div className="container relative z-10 text-white flex flex-col items-center justify-center px-4">
				<h1 className="font-serif text-5xl font-bold text-balance text-center">
					{title}
				</h1>
				<h2 className="text-2xl text-center text-balance leading-tight mt-3 mb-6 opacity-80">
					{subtitle}
				</h2>
				<div className="flex flex-col md:flex-row gap-4">
					{ctaButtons.map((btn) => {
						return (
							<a
								key={generateId()}
								className={`${btn.style === "primary" ? "bg-primary text-white" : btn.style === "secondary" ? "bg-secondary text-black" : "bg-transparent text-white border border-white"} px-6 py-3 rounded-full font-medium`}
								href={btn.externalLink || btn.internalPage?.slug}
								target={btn.externalLink ? "_blank" : "_self"}
							>
								{btn.label}
							</a>
						);
					})}
				</div>
				<p className="text-lg text-center mt-4">{description}</p>
			</div>

			<div className="absolute bg-black opacity-70 w-full h-full z-[2] top-0 left-0"></div>
			<Image
				src={imageUrl}
				alt="Hero Background"
				fill
				className="object-cover absolute w-full h-full z-[1]"
			/>
		</section>
	);
};

export default Hero;
