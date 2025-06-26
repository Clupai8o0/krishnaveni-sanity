import React from "react";
import { CTAProps } from "@/lib/types";
import Link from "next/link";
import { generateId } from "@/lib/utils";
import { Image } from "next-sanity/image";
import clsx from "clsx";

const CTA = ({ cta }: { cta: CTAProps }) => {
	return (
		<section className="w-full h-auto overflow-hidden py-40 bg-black relative px-4 md:px-8 mt-10 lg:mt-20">
			<Image
				src={cta.imageUrl.desktop}
				alt={cta.title}
				fill
				className="object-cover w-full h-full hidden lg:block opacity-20"
			/>
			<Image
				src={cta.imageUrl.mobile}
				alt={cta.title}
				fill
				className="object-cover w-full h-full block lg:hidden opacity-20"
			/>

			<div className="w-full max-w-7xl mx-auto h-auto relative flex flex-col items-center gap-3 text-white">
				<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{cta.title}
				</h1>
				<p className="font-sans text-lg md:text-xl lg:text-2xl font-medium text-balance text-center opacity-70">
					{cta.description}
				</p>
				<div className="flex flex-col md:flex-row gap-2 mt-4">
					{cta.ctaBtns.map((btn) => {
						return (
							<Link
								key={generateId()}
								className={clsx(
									"btn text-white",
									btn.style?.replace(/\u200B/g, "") === "primary" &&
										"btn-primary",
									btn.style?.replace(/\u200B/g, "") === "secondary" &&
										"btn-secondary",
									btn.style?.replace(/\u200B/g, "") === "outline" &&
										"btn-outline",
									btn.style?.replace(/\u200B/g, "") === "none" && "btn-none"
								)}
								href={btn.externalLink || btn.internalPage?.slug || ""}
								target={btn.externalLink ? "_blank" : "_self"}
							>
								{btn.label}
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default CTA;
