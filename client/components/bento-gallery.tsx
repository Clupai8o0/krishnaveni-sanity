import Link from "next/link";
import { Image } from "next-sanity/image";

import { generateId } from "@/lib/utils";
import { BentoGalleryProps } from "@/lib/types";

const BentoGallery = ({ title, imageUrl, ctaBtns }: BentoGalleryProps) => {
	return (
		<section className="w-full h-auto overflow-hidden py-20 relative px-4 md:px-8">
			<div className="w-full max-w-7xl mx-auto h-auto overflow-hidden py-1 relative flex flex-col">
				<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{title}
				</h1>
				<div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-2 mt-12 w-full h-[500px] lg:h-[600px]">
					<div className="col-span-1 row-span-1 relative overflow-hidden rounded-md flex items-end justify-start">
						<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full"></div>
						<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
							{imageUrl[0].label}
						</span>
						<Image
							src={imageUrl[0].desktopImage}
							alt={imageUrl[0].label}
							fill
							className="object-cover hidden lg:block"
						/>
						<Image
							src={imageUrl[0].mobileImage}
							alt={imageUrl[0].label}
							fill
							className="object-cover block lg:hidden absolute z-[1]"
						/>
					</div>
					<div className="hidden lg:flex col-span-1 row-span-1 relative overflow-hidden rounded-md items-end justify-start">
						<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full"></div>
						<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
							{imageUrl[3].label}
						</span>
						<Image
							src={imageUrl[3].desktopImage}
							alt={imageUrl[3].label}
							fill
							className="object-cover hidden lg:block"
						/>
					</div>
					<div className="col-span-1 row-span-2 relative overflow-hidden rounded-md flex items-end justify-start">
						<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full"></div>
						<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
							{imageUrl[1].label}
						</span>
						<Image
							src={imageUrl[1].desktopImage}
							alt={imageUrl[1].label}
							fill
							className="object-cover hidden lg:block"
						/>
						<Image
							src={imageUrl[1].mobileImage}
							alt={imageUrl[1].label}
							fill
							className="object-cover block lg:hidden"
						/>
					</div>
					<div className="col-span-1 lg:col-span-2 row-span-2 lg:row-span-1 relative overflow-hidden rounded-md flex items-end justify-start">
						<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full"></div>
						<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
							{imageUrl[2].label}
						</span>
						<Image
							src={imageUrl[2].desktopImage}
							alt={imageUrl[2].label}
							fill
							className="object-cover hidden lg:block"
						/>
						<Image
							src={imageUrl[2].mobileImage}
							alt={imageUrl[2].label}
							fill
							className="object-cover block lg:hidden"
						/>
					</div>
					<div className="col-span-1 row-span-1 lg:hidden relative overflow-hidden rounded-md flex items-end justify-start">
						<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full"></div>
						<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
							{imageUrl[3].label}
						</span>
						<Image
							src={imageUrl[3].mobileImage}
							alt={imageUrl[3].label}
							fill
							className="object-cover block lg:hidden"
						/>
					</div>
				</div>
				<div className="flex justify-center gap-2 mt-6">
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
		</section>
	);
};

export default BentoGallery;
