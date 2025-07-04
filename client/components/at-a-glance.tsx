import Link from "next/link";
import { DynamicIcon } from "lucide-react/dynamic";
import { Image } from "next-sanity/image";

import { IntroductionProps } from "@/lib/types";
import { generateId } from "@/lib/utils";

const AtAGlance = ({
	title,
	imageUrl,
	description,
	facts,
	ctaBtns,
}: IntroductionProps) => {
	return (
		<div className="w-full h-auto overflow-hidden py-10 relative px-4 md:px-8">
			<div className="max-w-7xl mx-auto relative z-10 text-black flex flex-col lg:flex-row-reverse items-center justify-center gap-10">
				<div className="w-full lg:w-[50vw] max-w-[680px] h-64 lg:h-[600px] relative">
					<Image src={imageUrl} alt={title} fill className="object-contain" />
				</div>

				<div className="flex flex-col items-center justify-center lg:items-start w-full lg:w-1/2">
					<h1 className="heading text-center">
						{title}
					</h1>
					<p className="text-base md:text-lg max-w-2xl text-center lg:text-left text-balance leading-tight mt-3 mb-6 opacity-80">
						{description}
					</p>

					<div className="flex flex-col md:flex-row gap-2">
						{ctaBtns.map((btn) => {
							return (
								<Link
									key={generateId()}
									className={`${btn.style === "primary" ? "btn-primary" : btn.style === "secondary" ? "btn-secondary" : btn.style === "outline" ? "btn-outline" : "btn-none"} btn`}
									href={btn.internalPage?.slug || ""}
								>
									{btn.label}
								</Link>
							);
						})}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto mt-6">
				{facts.map((fact) => (
					<div
						key={generateId()}
						className="flex flex-col items-center justify-center gap-2 text-center p-2"
					>
						<DynamicIcon name={fact.icon} className="w-8 h-8" />
						<h2 className="font-serif text-lg font-medium text-pretty">
							{fact.title}
						</h2>
						<p className="text-sm lg:text-base opacity-80 text-balance">
							{fact.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default AtAGlance;
