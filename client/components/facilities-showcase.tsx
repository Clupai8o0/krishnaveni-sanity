import Image from "next/image";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

import { generateId } from "@/lib/utils";
import { FacilitiesShowcaseProps } from "@/lib/types";

const CARD_ASSETS: Record<string, { image: string; category: string }> = {
	"gamepad-2": {
		image: "https://images.unsplash.com/photo-1576617057924-d4d4fe4b6c7d?w=800&q=80",
		category: "Campus",
	},
	trees: {
		image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&q=80",
		category: "Campus",
	},
	library: {
		image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
		category: "Academics",
	},
	"flask-conical": {
		image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80",
		category: "Science",
	},
	monitor: {
		image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
		category: "Technology",
	},
	palette: {
		image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
		category: "Arts",
	},
	"monitor-check": {
		image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
		category: "Technology",
	},
	"building-2": {
		image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
		category: "Campus",
	},
	cpu: {
		image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
		category: "AI & Tech",
	},
	calculator: {
		image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
		category: "Academics",
	},
	hash: {
		image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
		category: "Academics",
	},
	bot: {
		image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
		category: "Technology",
	},
	shield: {
		image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80",
		category: "Sports",
	},
	"graduation-cap": {
		image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
		category: "Academics",
	},
	bus: {
		image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
		category: "Transport",
	},
};

const DEFAULT_ASSET = {
	image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
	category: "Facility",
};

interface CardData {
	title: string;
	description: string;
	icon: IconName;
	color: string;
}

function getAccent(color: string) {
	return color.startsWith("#") ? color : `#${color}`;
}

function getAssets(icon: IconName) {
	return CARD_ASSETS[icon as string] ?? DEFAULT_ASSET;
}

function ImageCard({ card }: { card: CardData }) {
	const { image, category } = getAssets(card.icon);
	return (
		<div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer">
			<Image
				src={image}
				alt={card.title}
				fill
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
			<div className="absolute top-4 left-4">
				<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/25">
					<DynamicIcon name={card.icon} size={11} />
					{category}
				</span>
			</div>
			<div className="absolute bottom-0 left-0 right-0 p-5">
				<h3 className="text-white font-serif text-xl md:text-2xl font-semibold leading-tight mb-1">
					{card.title}
				</h3>
				<p className="text-white/70 text-sm line-clamp-2">{card.description}</p>
			</div>
		</div>
	);
}

function TextCard({ card }: { card: CardData }) {
	const { category } = getAssets(card.icon);
	const accent = getAccent(card.color);
	return (
		<div className="h-full rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
			<div>
				<div
					className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
					style={{ backgroundColor: `${accent}18` }}
				>
					<DynamicIcon name={card.icon} size={22} style={{ color: accent }} />
				</div>
				<span
					className="text-xs font-bold uppercase tracking-[0.15em] mb-2 block"
					style={{ color: accent }}
				>
					{category}
				</span>
				<h3 className="font-serif text-xl font-semibold text-gray-900 mb-2 leading-tight">
					{card.title}
				</h3>
				<p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
			</div>
			<a
				href="#"
				className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 hover:gap-3 transition-all duration-200"
				style={{ color: accent }}
			>
				Explore Facility <span>→</span>
			</a>
		</div>
	);
}

function DarkCard({ card }: { card: CardData }) {
	const accent = getAccent(card.color);
	return (
		<div className="h-full rounded-2xl p-6 flex flex-col justify-between bg-[#0d1f35]">
			<div>
				<div
					className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
					style={{ backgroundColor: `${accent}25` }}
				>
					<DynamicIcon name={card.icon} size={22} style={{ color: accent }} />
				</div>
				<h3 className="font-serif text-xl font-semibold text-white mb-2 leading-tight">
					{card.title}
				</h3>
				<p className="text-white/55 text-sm leading-relaxed">{card.description}</p>
			</div>
		</div>
	);
}

function GridCard({ card }: { card: CardData }) {
	const { image, category } = getAssets(card.icon);
	const accent = getAccent(card.color);
	return (
		<div className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
			<div className="relative h-44 overflow-hidden flex-shrink-0">
				<Image
					src={image}
					alt={card.title}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<span className="absolute top-3 left-3 text-xs font-semibold bg-black/55 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
					{category}
				</span>
			</div>
			<div className="flex flex-col flex-1 p-4">
				<h3 className="font-serif text-base font-semibold text-gray-900 mb-1.5 leading-snug">
					{card.title}
				</h3>
				<p className="text-gray-500 text-sm flex-1 line-clamp-3 leading-relaxed">
					{card.description}
				</p>
				<a
					href="#"
					className="inline-flex items-center gap-1 text-sm font-semibold mt-3 group-hover:gap-2 transition-all duration-200"
					style={{ color: accent }}
				>
					Learn More <span>→</span>
				</a>
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
				{/* Premier facilities header */}
				<div className="flex items-center gap-3 mb-3">
					<div className="h-px flex-1 bg-gray-200" />
					<span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
						✦&nbsp; Our Premier Facilities &nbsp;✦
					</span>
					<div className="h-px flex-1 bg-gray-200" />
				</div>
				<p className="text-center text-gray-400 text-sm mb-10 max-w-sm mx-auto">
					Purpose-built spaces where curiosity is nurtured and brilliance grows
				</p>

				{/* Bento grid — desktop only layout */}
				<div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-3 h-[560px]">
					<div className="col-span-2">
						<ImageCard card={bentoCards[0]} />
					</div>
					<div className="col-span-1">
						<TextCard card={bentoCards[1]} />
					</div>
					<div className="col-span-1">
						<DarkCard card={bentoCards[2]} />
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
				<div className="mt-20 mb-3 flex items-center gap-4">
					<div className="h-px flex-1 bg-gray-200" />
					<span className="text-sm font-medium text-gray-400 whitespace-nowrap italic">
						…and so much more
					</span>
					<div className="h-px flex-1 bg-gray-200" />
				</div>
				<p className="text-center text-gray-400 text-sm mb-10">
					Explore the full range of what we offer our students
				</p>

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
