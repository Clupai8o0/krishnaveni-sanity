import Link from "next/link";
import { sanityClient, ACHIEVEMENTS_QUERY, Post } from "@/lib/sanity-client";
import Hero from "@/components/hero";

export const revalidate = 60;

export async function generateMetadata() {
	return {
		title: "Achievements – Krishnaveni School",
		description: "Explore the remarkable achievements of Krishnaveni School students and staff.",
	};
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
	const posts: Post[] = await sanityClient.fetch(ACHIEVEMENTS_QUERY);

	return (
		<>
			<Hero
				_key="achievements-hero"
				_type="heroSection"
				title="Achievements"
				subtitle="Our Honours & Recognitions"
				description="Krishnaveni School is proud of the remarkable achievements of our students and staff."
				imageUrl={{
					desktop: "https://cdn.sanity.io/images/jzbduz09/production/05f745aaf696ed75e192341f84da7c027eb5aa4d-1680x1120.jpg",
					mobile: "https://cdn.sanity.io/images/jzbduz09/production/960c9f6115c323d593f04ae389bd07ea91770cbf-637x896.jpg",
				}}
			/>

			<section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-8">
				<div className="mb-10 text-center">
					<h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
						Our Achievements
					</h2>
					<p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
						Excellence, dedication, and recognition across academics, sports, and co-curricular activities.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{HIGHLIGHTS.map((h) => (
						<div
							key={h.title}
							className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="text-3xl mb-3">{h.emoji}</div>
							<h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{h.title}</h3>
							<p className="text-gray-500 text-sm leading-relaxed">{h.body}</p>
						</div>
					))}
				</div>
			</section>

			<main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-24">
				{posts?.length > 0 && (
					<h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8">
						Our Latest Achievements
					</h2>
				)}
				{!posts?.length ? (
					<p className="text-gray-500 text-lg">No achievements posted yet. Check back soon.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{posts.map((post) => (
							<Link
								key={post._id}
								href={`/updates/${post.slug}`}
								className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
							>
								{post.thumbnailUrl ? (
									<div className="h-48 w-full overflow-hidden">
										<img
											src={post.thumbnailUrl}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
								) : (
									<div className="h-48 w-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
										<span className="text-yellow-600 text-sm font-medium uppercase tracking-wide">Achievement</span>
									</div>
								)}
								<div className="p-5">
									<div className="flex items-center gap-2 mb-3">
										<span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
											Achievement
										</span>
										<span className="text-xs text-gray-400">
											{new Date(post.publishedAt ?? post._createdAt).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "short",
												year: "numeric",
											})}
										</span>
									</div>
									<h2 className="font-serif font-bold text-gray-900 text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
										{post.title}
									</h2>
									{post.content && (
										<p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.content}</p>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</main>
		</>
	);
}
