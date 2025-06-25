import { Image } from "next-sanity/image";
import React from "react";
import { TwoColLayoutProps } from "@/lib/types";
import { PortableText } from "next-sanity";
import clsx from "clsx";

const TwoColLayout = ({
	imageUrl,
	title,
	content,
	reverse,
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
					<Image src={imageUrl} alt={title} fill className="object-cover" />
				</div>

				<div className="flex flex-col gap-4 lg:w-1/2 lg:justify-center">
					<h2 className="heading">{title}</h2>
					<div className="opacity-80">
						<PortableText value={content} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default TwoColLayout;
