import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, Post } from "@/lib/sanity-client";
import { PostImages } from "@/components/post-images";

export const dynamicParams = true;

export async function generateStaticParams() {
	const data = await sanityClient.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
	return (data ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await sanityClient.fetch<Pick<Post, "title" | "content"> | null>(
		POST_BY_SLUG_QUERY,
		{ slug }
	);
	if (!post) return {};
	return {
		title: `${post.title} – Krishnaveni School`,
		description: post.content?.slice(0, 160) || undefined,
	};
}

const CATEGORY_STYLES: Record<string, string> = {
	news: "bg-blue-100 text-blue-700",
	achievement: "bg-yellow-100 text-yellow-700",
	achievements: "bg-yellow-100 text-yellow-700",
	events: "bg-purple-100 text-purple-700",
	announcements: "bg-orange-100 text-orange-700",
	"republic-day": "bg-green-100 text-green-700",
	celebrations: "bg-pink-100 text-pink-700",
	"field-trips": "bg-teal-100 text-teal-700",
	"teacher-development": "bg-indigo-100 text-indigo-700",
	video: "bg-red-100 text-red-700",
};

const CATEGORY_LABELS: Record<string, string> = {
	news: "News",
	achievement: "Achievement",
	achievements: "Achievement",
	events: "Events",
	announcements: "Announcements",
	"republic-day": "Republic Day",
	celebrations: "Celebrations",
	"field-trips": "Field Trips",
	"teacher-development": "Teacher Development",
	video: "Video",
};

const ACHIEVEMENT_CATEGORIES = new Set(["achievement", "achievements"]);

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });

	if (!post) notFound();

	const isAchievement = ACHIEVEMENT_CATEGORIES.has(post.category);
	const backHref = isAchievement ? "/achievements" : "/updates";
	const backLabel = isAchievement ? "Back to Achievements" : "Back to Updates";

	const paragraphs = post.content?.split("\n\n").filter(Boolean) ?? [];
	const images: string[] = (post.images ?? []).filter(Boolean);
	const videos: string[] = (post.videos ?? []).filter(Boolean);

	return (
		<main className="max-w-4xl mx-auto px-4 md:px-8 pt-36 pb-24">
			<Link
				href={backHref}
				className="text-sm text-gray-500 hover:text-gray-800 mb-10 inline-block transition-colors"
			>
				← {backLabel}
			</Link>

			<div className="flex items-center gap-3 mb-4">
				<span
					className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-gray-600"}`}
				>
					{CATEGORY_LABELS[post.category] ?? post.category}
				</span>
				<span className="text-sm text-gray-400">
					{new Date(post.publishedAt ?? post._createdAt).toLocaleDateString(
						"en-IN",
						{ day: "numeric", month: "long", year: "numeric" }
					)}
				</span>
			</div>

			<h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
				{post.title}
			</h1>

			{/* Description first */}
			{paragraphs.length > 0 && (
				<div className="flex flex-col gap-4 mb-8">
					{paragraphs.map((para, i) => (
						<p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed">
							{para}
						</p>
					))}
				</div>
			)}

			{/* Images + videos after description — clickable lightbox */}
			{(images.length > 0 || videos.length > 0) && (
				<PostImages images={images} videos={videos} />
			)}

			{/* Thumbnail fallback when no media */}
			{images.length === 0 && videos.length === 0 && post.thumbnailUrl && (
				<PostImages images={[post.thumbnailUrl]} />
			)}
		</main>
	);
}
