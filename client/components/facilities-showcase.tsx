import Image from "next/image";

import { generateId } from "@/lib/utils";
import { FacilitiesShowcaseProps } from "@/lib/types";

const DEFAULT_IMAGE =
	"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80";

interface CardData {
	title: string;
	description: string;
	color: string;
	category?: string;
	imageUrl?: string;
}

function ImageCard({ card }: { card: CardData }) {
	const image = card.imageUrl ?? DEFAULT_IMAGE;
	return (
		<div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer">
			<Image
				src={image}
				alt={card.title}
				fill
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			{card.category && (
				<div className="absolute top-4 left-4">
					<span className="text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/25">
						{card.category}
					</span>
				</div>
			)}
			<div className="absolute bottom-0 left-0 right-0 p-5">
				<h3 className="text-white font-serif text-xl md:text-2xl font-medium leading-tight mb-1">
					{card.title}
				</h3>
				<p className="text-white/70 text-sm line-clamp-2">{card.description}</p>
			</div>
		</div>
	);
}

function GridCard({ card }: { card: CardData }) {
	const image = card.imageUrl ?? DEFAULT_IMAGE;
	return (
		<div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
			<Image
				src={image}
				alt={card.title}
				fill
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			{card.category && (
				<div className="absolute top-4 left-4">
					<span className="text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/25">
						{card.category}
					</span>
				</div>
			)}
			<div className="absolute bottom-0 left-0 right-0 p-5">
				<h3 className="text-white font-serif text-lg font-medium leading-tight mb-1">
					{card.title}
				</h3>
				<p className="text-white/70 text-sm line-clamp-2">{card.description}</p>
			</div>
		</div>
	);
}

// Bento slot order: Library[2], Lab[3], Playroom[0], Playground[1]
const BENTO_INDICES = [2, 3, 0, 1];

function FacilitiesShowcase({ cards }: FacilitiesShowcaseProps) {
	const bentoCards = BENTO_INDICES.map((i) => cards[i]).filter(Boolean);
	const remaining = cards.slice(4);

	return (
		<section className="parent-container py-12 md:py-20">
			<div className="container">
				<h2 className="heading text-center">Our Facilities</h2>
				<p className="text-base md:text-lg text-center max-w-2xl mx-auto opacity-80 mt-3 mb-10">
					Purpose-built spaces where curiosity is nurtured and brilliance grows
				</p>

				{/* Bento grid — desktop only layout */}
				<div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-3 h-[560px]">
					<div className="col-span-2">
						<ImageCard card={bentoCards[0]} />
					</div>
					<div className="col-span-1">
						<ImageCard card={bentoCards[1]} />
					</div>
					<div className="col-span-1">
						<ImageCard card={bentoCards[2]} />
					</div>
					<div className="col-span-2">
						<ImageCard card={bentoCards[3]} />
					</div>
				</div>

				{/* Mobile bento fallback — 2-column grid */}
				<div className="lg:hidden grid grid-cols-2 gap-3">
					{bentoCards.map((card, i) => (
						<div key={generateId()} className={`h-52 ${i === 0 ? "col-span-2" : ""}`}>
							<ImageCard card={card} />
						</div>
					))}
				</div>

				{/* Grid section divider */}
				<div className="mt-20 mb-3">
					<h3 className="font-serif text-2xl md:text-3xl font-semibold text-center text-balance">
						And so much more
					</h3>
					<p className="text-base md:text-lg text-center max-w-2xl mx-auto opacity-80 mt-3 mb-10">
						Explore the full range of what we offer our students
					</p>
				</div>

				{/* Remaining facilities grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{remaining.map((card) => (
						<GridCard key={generateId()} card={card} />
					))}
				</div>
			</div>
		</section>
	);
}

export default FacilitiesShowcase;
