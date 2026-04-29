import GalleryGrid from "./gallery-grid";
import type { PhotoGalleryProps } from "@/lib/types";

const PhotoGallery = ({
	title,
	emoji,
	description,
	year,
	items,
}: PhotoGalleryProps) => {
	return (
		<section className="w-full px-4 md:px-8 py-4">
			<div className="max-w-7xl mx-auto">
				<div className="mb-6">
					<div className="flex items-center gap-3 mb-2">
						<span className="text-3xl">{emoji}</span>
						<h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
							{title}
						</h2>
						<span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
							{year}
						</span>
					</div>
					{description && (
						<p className="text-gray-500 text-base max-w-2xl">{description}</p>
					)}
				</div>
				<GalleryGrid items={items} />
			</div>
		</section>
	);
};

export default PhotoGallery;
