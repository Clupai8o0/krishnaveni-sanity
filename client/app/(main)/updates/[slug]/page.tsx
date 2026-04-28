import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamicParams = true;

export async function generateStaticParams() {
	const { data } = await supabase
		.from("posts")
		.select("slug")
		.eq("published", true);
	return (data ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { data: post } = await supabase
		.from("posts")
		.select("title, content")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (!post) return {};
	return {
		title: `${post.title} – Krishnaveni School`,
		description: post.content?.slice(0, 160) || undefined,
	};
}

function getYouTubeId(url: string): string | null {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
	);
	return match ? match[1] : null;
}

const CATEGORY_STYLES: Record<string, string> = {
	news: "bg-blue-100 text-blue-700",
	achievement: "bg-yellow-100 text-yellow-700",
	video: "bg-red-100 text-red-700",
};

const CATEGORY_LABELS: Record<string, string> = {
	news: "News",
	achievement: "Achievement",
	video: "Video",
};

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { data: post } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (!post) notFound();

	const youtubeId = post.video_url ? getYouTubeId(post.video_url) : null;
	const paragraphs = post.content?.split("\n\n").filter(Boolean) ?? [];

	return (
		<main className="max-w-3xl mx-auto px-4 md:px-8 pt-36 pb-24">
			<Link
				href="/updates"
				className="text-sm text-gray-500 hover:text-gray-800 mb-10 inline-block transition-colors"
			>
				← Back to Updates
			</Link>

			<div className="flex items-center gap-3 mb-4">
				<span
					className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-gray-600"}`}
				>
					{CATEGORY_LABELS[post.category] ?? post.category}
				</span>
				<span className="text-sm text-gray-400">
					{new Date(post.published_at ?? post.created_at).toLocaleDateString(
						"en-IN",
						{ day: "numeric", month: "long", year: "numeric" }
					)}
				</span>
			</div>

			<h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
				{post.title}
			</h1>

			{post.thumbnail_url && !youtubeId && (
				<div className="rounded-2xl overflow-hidden mb-8 aspect-video">
					<img
						src={post.thumbnail_url}
						alt={post.title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{youtubeId && (
				<div className="rounded-2xl overflow-hidden mb-8 aspect-video">
					<iframe
						src={`https://www.youtube.com/embed/${youtubeId}`}
						title={post.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full"
					/>
				</div>
			)}

			{paragraphs.length > 0 && (
				<div className="flex flex-col gap-4">
					{paragraphs.map((para: string, i: number) => (
						<p
							key={i}
							className="text-gray-700 text-base md:text-lg leading-relaxed"
						>
							{para}
						</p>
					))}
				</div>
			)}
		</main>
	);
}
