import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TwoColLayoutProps } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import { generateId } from "@/lib/utils";
import clsx from "clsx";

const TwoColLayout = ({
	imageUrl,
	title,
	content,
	reverse,
	imageFit,
	ctaBtns,
}: TwoColLayoutProps) => {
	return (
		<section className="parent-container">
			<div
				className={clsx(
					"container flex flex-col gap-10",
					(reverse && "lg:flex-row-reverse") || "lg:flex-row"
				)}
			>
				<div className="relative h-[400px] w-full overflow-hidden rounded-lg lg:w-1/2">
					<Image
						src={imageUrl}
						alt={title}
						fill
						className={clsx(
							imageFit === "contain" && "object-contain" || "object-cover",
						)}
					/>
				</div>

				<div className="flex flex-col gap-4 lg:w-1/2 lg:justify-center">
					<h2 className="heading">{title}</h2>
					<div className="opacity-80">
						<PortableText value={content} />
					</div>
					{ctaBtns && ctaBtns.length > 0 && (
						<div className="flex flex-col sm:flex-row gap-2 mt-2">
							{ctaBtns.map((btn) => (
								<Link
									key={generateId()}
									className={`btn ${btn.style === "primary" ? "btn-primary" : btn.style === "secondary" ? "btn-secondary" : btn.style === "outline" ? "btn-outline" : "btn-none"}`}
									href={btn.externalLink || btn.internalPage?.slug || ""}
									target={btn.externalLink ? "_blank" : "_self"}
								>
									{btn.label}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default TwoColLayout;
