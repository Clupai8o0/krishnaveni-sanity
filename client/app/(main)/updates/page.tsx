import Link from "next/link";
import { sanityClient, POSTS_QUERY, Post } from "@/lib/sanity-client";
import Hero from "@/components/hero";
import PhotoGallery from "@/components/photo-gallery";

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

			<PhotoGallery
				_key="gallery-republic-day"
				_type="photoGallery"
				title="Republic Day"
				emoji="🇮🇳"
				description="Celebrating Republic Day with pride, patriotism, and enthusiasm."
				year="2025"
				items={[
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.29%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.29%20%285%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.30%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.30%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.30%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.30.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.31%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.31%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.31%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.31.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.32%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.32.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.33%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.33%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.33%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.33.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.34%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.34%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.34%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.34.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.35%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.35%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.35%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.35.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.36%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.36.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37%20%284%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37%20%285%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.37.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.38%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.38%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.38%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Image%202026-04-22%20at%2012.42.38.jpeg", type: "image" },
					{ url: "/upgrade/republic-day/WhatsApp%20Video%202026-04-22%20at%2012.42.32.mp4", type: "video" },
					{ url: "/upgrade/republic-day/WhatsApp%20Video%202026-04-22%20at%2012.42.36.mp4", type: "video" },
				]}
			/>

			<PhotoGallery
				_key="gallery-celebrations"
				_type="photoGallery"
				title="Celebrations"
				emoji="🎉"
				description="School celebrations and special occasions bringing the community together."
				year="2025"
				items={[
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.41%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.42%20%283%29.jpeg", type: "image" },
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.43%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.44%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.45%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/celebrations/WhatsApp%20Image%202026-04-22%20at%2012.42.49%20%282%29.jpeg", type: "image" },
				]}
			/>

			<PhotoGallery
				_key="gallery-field-trip"
				_type="photoGallery"
				title="Field Trips"
				emoji="🚌"
				description="Educational field trips enriching students' learning experiences."
				year="2025"
				items={[
					{ url: "/upgrade/field-trip/WhatsApp%20Image%202026-04-22%20at%2012.42.39%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/field-trip/WhatsApp%20Image%202026-04-22%20at%2012.42.40%20%281%29.jpeg", type: "image" },
					{ url: "/upgrade/field-trip/WhatsApp%20Image%202026-04-22%20at%2012.42.40%20%282%29.jpeg", type: "image" },
					{ url: "/upgrade/field-trip/WhatsApp%20Image%202026-04-22%20at%2012.42.48%20%282%29.jpeg", type: "image" },
				]}
			/>

			<PhotoGallery
				_key="gallery-teachers"
				_type="photoGallery"
				title="Teacher Development"
				emoji="👩‍🏫"
				description="Professional development programs keeping our teachers at the forefront of education."
				year="2025"
				items={[
					{ url: "/upgrade/professional-development-for-teacher/WhatsApp%20Image%202026-04-22%20at%2012.42.49%20%281%29.jpeg", type: "image" },
				]}
			/>
		</>
	);
}
