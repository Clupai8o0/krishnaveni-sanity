import { getMetadata } from "@/lib/metadata";
import { PAGE_TYPES } from "@/lib/constants";
import { getPageData } from "@/lib/queries";
import { SectionRenderer } from "@/components/section-renderer";
import GalleryGrid from "@/components/gallery-grid";
import { GALLERY_CATEGORIES } from "@/lib/gallery-data";

export async function generateMetadata() {
	return getMetadata(PAGE_TYPES.ACHIEVEMENTS);
}

const HIGHLIGHTS = [
	{
		emoji: "🥋",
		title: "Karate",
		body: "M. Saanvi and P. Devisree (5th Class) achieved recognition in the Limca Book of Records. Other students also earned Karate certifications, showcasing discipline and dedication.",
	},
	{
		emoji: "🤖",
		title: "Robotics",
		body: "Students secured certifications and medals in Robotics, demonstrating innovation, creativity, and technical skills.",
	},
	{
		emoji: "🧠",
		title: "Vedic Maths & IIT Foundation",
		body: "Students from Classes 6–10 earned medals and certificates, reflecting strong analytical and problem-solving abilities.",
	},
	{
		emoji: "🔢",
		title: "Abacus",
		body: "Primary students completed Abacus training and received certifications, improving concentration and calculation speed.",
	},
	{
		emoji: "🏛️",
		title: "Tata Building India",
		body: "Participation & recognition in programs conducted at Tata Group initiatives (Tata Building India activities).",
	},
	{
		emoji: "🌿",
		title: "Eco Club",
		body: "Active involvement in National Green Corps (Eco Club) activities and receipt of Eco Club certificates.",
	},
];

export default async function AchievementsPage() {
	const page = await getPageData(PAGE_TYPES.ACHIEVEMENTS);

	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<SectionRenderer content={page.content} />

			{/* Achievements 2025 */}
			<section className="w-full px-4 md:px-8 py-4">
				<div className="max-w-7xl mx-auto">
					<div className="mb-10 text-center">
						<span className="text-sm font-semibold uppercase tracking-widest text-primary/70">
							Academic Year
						</span>
						<h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2">
							Achievements 2025
						</h2>
						<p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
							A year of excellence, dedication, and recognition across academics,
							sports, and co-curricular activities.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{HIGHLIGHTS.map((h) => (
							<div
								key={h.title}
								className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="text-3xl mb-3">{h.emoji}</div>
								<h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
									{h.title}
								</h3>
								<p className="text-gray-500 text-sm leading-relaxed">{h.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Photo & Video Galleries */}
			{GALLERY_CATEGORIES.map((category) => (
				<section
					key={category.id}
					className="w-full px-4 md:px-8"
					id={`gallery-${category.id}`}
				>
					<div className="max-w-7xl mx-auto">
						<div className="mb-6">
							<div className="flex items-center gap-3 mb-2">
								<span className="text-3xl">{category.emoji}</span>
								<h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
									{category.title}
								</h2>
								<span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
									{category.year}
								</span>
							</div>
							<p className="text-gray-500 text-base max-w-2xl">
								{category.description}
							</p>
						</div>
						<GalleryGrid items={category.items} />
					</div>
				</section>
			))}
		</main>
	);
}
