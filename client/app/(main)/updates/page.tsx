import Link from "next/link";
import { sanityClient, POSTS_QUERY, Post } from "@/lib/sanity-client";
import Hero from "@/components/hero";

export const revalidate = 60;

export async function generateMetadata() {
	return {
		title: "Updates – Krishnaveni School",
		description:
			"Latest news, achievements, and updates from Krishnaveni School.",
	};
}

const CATEGORY_STYLES: Record<string, string> = {
	news: "bg-blue-100 text-blue-700",
	events: "bg-purple-100 text-purple-700",
	achievements: "bg-yellow-100 text-yellow-700",
	announcements: "bg-orange-100 text-orange-700",
	"republic-day": "bg-green-100 text-green-700",
	celebrations: "bg-pink-100 text-pink-700",
	"field-trips": "bg-teal-100 text-teal-700",
	"teacher-development": "bg-indigo-100 text-indigo-700",
};

const CATEGORY_LABELS: Record<string, string> = {
	news: "News",
	events: "Events",
	achievements: "Achievements",
	announcements: "Announcements",
	"republic-day": "Republic Day",
	celebrations: "Celebrations",
	"field-trips": "Field Trips",
	"teacher-development": "Teacher Development",
};

export default async function UpdatesPage() {
	const posts: Post[] = await sanityClient.fetch(POSTS_QUERY);

	return (
		<>
			<Hero
				_key="updates-hero"
				_type="heroSection"
				title="Updates"
				subtitle="News, Achievements & Events"
				description="Stay up to date with the latest happenings at Krishnaveni School."
				imageUrl={{
					desktop: "/hero-bg-desktop.jpg",
					mobile: "/hero-bg-mobile.jpg",
				}}
			/>

			<main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-24">
				{!posts?.length ? (
					<p className="text-gray-500 text-lg">No updates yet. Check back soon.</p>
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
									<div className="h-48 w-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
										<span className="text-gray-400 text-sm font-medium uppercase tracking-wide">
											{CATEGORY_LABELS[post.category] ?? post.category}
										</span>
									</div>
								)}

								<div className="p-5">
									<div className="flex items-center gap-2 mb-3">
										<span
											className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-gray-600"}`}
										>
											{CATEGORY_LABELS[post.category] ?? post.category}
										</span>
										<span className="text-xs text-gray-400">
											{new Date(
												post.publishedAt ?? post._createdAt
											).toLocaleDateString("en-IN", {
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
										<p className="text-gray-500 text-sm mt-2 line-clamp-2">
											{post.content}
										</p>
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
