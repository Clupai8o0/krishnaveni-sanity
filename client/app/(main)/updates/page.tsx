import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
	achievement: "bg-yellow-100 text-yellow-700",
	video: "bg-red-100 text-red-700",
	gallery: "bg-purple-100 text-purple-700",
};

const CATEGORY_LABELS: Record<string, string> = {
	news: "News",
	achievement: "Achievement",
	video: "Video",
	gallery: "Gallery",
};

type GalleryContent = {
	description?: string;
	items?: { url: string; type: string; caption?: string }[];
};

function parseGalleryContent(content: string): GalleryContent | null {
	try {
		const parsed = JSON.parse(content);
		if (parsed && Array.isArray(parsed.items)) return parsed;
	} catch {}
	return null;
}

function GalleryPreview({ content }: { content: string }) {
	const gallery = parseGalleryContent(content);
	if (!gallery?.items?.length) return null;
	const images = gallery.items.filter((i) => i.type === "image").slice(0, 4);
	if (!images.length) return null;
	return (
		<div className="h-48 w-full grid grid-cols-2 gap-0.5">
			{images.map((img, i) => (
				<div key={i} className="overflow-hidden">
					<img
						src={img.url}
						alt={img.caption ?? ""}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
			))}
		</div>
	);
}

export default async function UpdatesPage() {
	const { data: posts } = await supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.order("published_at", { ascending: false });

	return (
		<main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-40 pb-24">
			<h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12">
				Updates
			</h1>

			{!posts?.length ? (
				<p className="text-gray-500 text-lg">
					No updates yet. Check back soon.
				</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => (
						<Link
							key={post.id}
							href={`/updates/${post.slug}`}
							className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
						>
							{post.category === "gallery" ? (
								<GalleryPreview content={post.content ?? ""} />
							) : post.thumbnail_url ? (
								<div className="h-48 w-full overflow-hidden">
									<img
										src={post.thumbnail_url}
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
											post.published_at ?? post.created_at
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
								{post.category === "gallery" ? (
									<p className="text-gray-500 text-sm mt-2 line-clamp-2">
										{(() => {
											const g = parseGalleryContent(post.content ?? "");
											return g?.description || `${g?.items?.length ?? 0} photos`;
										})()}
									</p>
								) : (
									post.content && (
										<p className="text-gray-500 text-sm mt-2 line-clamp-2">
											{post.content}
										</p>
									)
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
