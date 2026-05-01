import Link from "next/link";
import Image from "next/image";

import { BentoGalleryProps } from "@/lib/types";

const Card = ({
	label,
	desktopImage,
	mobileImage,
	link,
	className,
}: {
	label: string;
	desktopImage: string;
	mobileImage?: string;
	link?: string;
	className: string;
}) => {
	const inner = (
		<>
			<div className="absolute [box-shadow:0_0_20px_30px_rgba(0,0,0,0.3)_inset] z-[2] w-full h-full" />
			<span className="inline-block text-white font-medium text-base relative z-[3] m-2">
				{label}
			</span>
			<Image
				src={desktopImage}
				alt={label}
				fill
				className="object-cover hidden lg:block"
			/>
			{mobileImage && (
				<Image
					src={mobileImage}
					alt={label}
					fill
					className="object-cover block lg:hidden absolute z-[1]"
				/>
			)}
		</>
	);

	const shared = `${className} relative overflow-hidden rounded-md flex items-end justify-start`;

	if (link) {
		return (
			<Link href={link} className={`${shared} group`}>
				<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-[4]" />
				{inner}
			</Link>
		);
	}

	return <div className={shared}>{inner}</div>;
};

const BentoGallery = ({ title, imageUrl }: BentoGalleryProps) => {
	return (
		<section className="w-full h-auto overflow-hidden py-20 relative px-4 md:px-8">
			<div className="w-full max-w-7xl mx-auto h-auto overflow-hidden py-1 relative flex flex-col">
				<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{title}
				</h1>
				<div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-2 mt-12 w-full h-[500px] lg:h-[600px]">
					<Card
						{...imageUrl[0]}
						className="col-span-1 row-span-1"
					/>
					<Card
						{...imageUrl[3]}
						className="hidden lg:flex col-span-1 row-span-1"
					/>
					<Card
						{...imageUrl[1]}
						className="col-span-1 row-span-2"
					/>
					<Card
						{...imageUrl[2]}
						className="col-span-1 lg:col-span-2 row-span-2 lg:row-span-1"
					/>
					<Card
						{...imageUrl[3]}
						mobileImage={imageUrl[3].mobileImage}
						className="col-span-1 row-span-1 lg:hidden"
					/>
				</div>
			</div>
		</section>
	);
};

export default BentoGallery;
