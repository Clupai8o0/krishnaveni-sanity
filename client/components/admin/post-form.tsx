"use client";

import { useState, useEffect, useCallback, useActionState } from "react";
import { savePost } from "@/app/admin/actions";
import { Post } from "@/lib/supabase";
import { GALLERY_CATEGORIES, GalleryItem } from "@/lib/gallery-data";
import Link from "next/link";

function toSlug(str: string) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

type GalleryItemDraft = {
	url: string;
	type: "image" | "video";
	caption: string;
};

function parseExistingGallery(content: string): {
	description: string;
	items: GalleryItemDraft[];
} {
	try {
		const parsed = JSON.parse(content);
		if (parsed && typeof parsed === "object" && Array.isArray(parsed.items)) {
			return {
				description: parsed.description ?? "",
				items: parsed.items.map((item: GalleryItem) => ({
					url: item.url,
					type: item.type,
					caption: item.caption ?? "",
				})),
			};
		}
	} catch {}
	return { description: "", items: [] };
}

function getYouTubeThumb(url: string): string | null {
	const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
	return match
		? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
		: null;
}

export function PostForm({ post }: { post?: Post }) {
	const [state, formAction, pending] = useActionState(savePost, null);
	const [title, setTitle] = useState(post?.title ?? "");
	const [slug, setSlug] = useState(post?.slug ?? "");
	const [slugLocked, setSlugLocked] = useState(!!post);
	const [category, setCategory] = useState(post?.category ?? "news");

	// Gallery state
	const isGallery = category === "gallery";
	const initialGallery =
		post?.category === "gallery" && post?.content
			? parseExistingGallery(post.content)
			: { description: "", items: [] };
	const [galleryDesc, setGalleryDesc] = useState(initialGallery.description);
	const [galleryItems, setGalleryItems] = useState<GalleryItemDraft[]>(
		initialGallery.items
	);
	const [youtubeInput, setYoutubeInput] = useState("");
	const [libraryOpen, setLibraryOpen] = useState(false);
	const [libraryCategory, setLibraryCategory] = useState(
		GALLERY_CATEGORIES[0].id
	);

	// Serialised content for the hidden input (gallery mode)
	const galleryContentJson = JSON.stringify({
		description: galleryDesc,
		items: galleryItems,
	});

	// First image URL becomes thumbnail
	const galleryThumbnail =
		galleryItems.find((i) => i.type === "image")?.url ?? "";

	// Non-gallery content textarea state
	const [textContent, setTextContent] = useState(
		post?.category !== "gallery" ? (post?.content ?? "") : ""
	);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		if (!slugLocked) setSlug(toSlug(e.target.value));
	};

	const toggleLibraryItem = useCallback(
		(item: GalleryItem) => {
			const exists = galleryItems.some((g) => g.url === item.url);
			if (exists) {
				setGalleryItems((prev) => prev.filter((g) => g.url !== item.url));
			} else {
				setGalleryItems((prev) => [
					...prev,
					{ url: item.url, type: item.type, caption: "" },
				]);
			}
		},
		[galleryItems]
	);

	const addYouTubeVideo = () => {
		if (!youtubeInput.trim()) return;
		setGalleryItems((prev) => [
			...prev,
			{ url: youtubeInput.trim(), type: "video", caption: "" },
		]);
		setYoutubeInput("");
	};

	const removeGalleryItem = (idx: number) => {
		setGalleryItems((prev) => prev.filter((_, i) => i !== idx));
	};

	const updateCaption = (idx: number, caption: string) => {
		setGalleryItems((prev) =>
			prev.map((item, i) => (i === idx ? { ...item, caption } : item))
		);
	};

	const activeLibraryCat = GALLERY_CATEGORIES.find(
		(c) => c.id === libraryCategory
	);

	return (
		<form action={formAction} className="flex flex-col gap-5">
			{post && <input type="hidden" name="id" value={post.id} />}

			{/* Hidden fields for gallery mode */}
			{isGallery && (
				<>
					<input type="hidden" name="content" value={galleryContentJson} />
					<input
						type="hidden"
						name="thumbnail_url"
						value={galleryThumbnail}
					/>
				</>
			)}

			{state?.error && (
				<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
					{state.error}
				</p>
			)}

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-semibold text-gray-700">Title *</label>
				<input
					type="text"
					name="title"
					required
					value={title}
					onChange={handleTitleChange}
					placeholder="Post title"
					className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-semibold text-gray-700">Slug *</label>
				<div className="flex gap-2">
					<input
						type="text"
						name="slug"
						required
						value={slug}
						onChange={(e) => {
							setSlug(e.target.value);
							setSlugLocked(true);
						}}
						placeholder="post-url-slug"
						className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-mono"
					/>
					{post && (
						<button
							type="button"
							onClick={() => setSlugLocked(false)}
							className="text-xs text-gray-400 hover:text-gray-700 px-3 border border-gray-200 rounded-lg transition-colors"
						>
							Unlock
						</button>
					)}
				</div>
				{post && (
					<p className="text-xs text-amber-600">
						Changing the slug will break existing links to this post.
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-semibold text-gray-700">
					Category *
				</label>
				<select
					name="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
				>
					<option value="news">News</option>
					<option value="achievement">Achievement</option>
					<option value="video">Video</option>
					<option value="gallery">Gallery</option>
				</select>
			</div>

			{/* Gallery Builder */}
			{isGallery ? (
				<div className="flex flex-col gap-4 border border-purple-100 rounded-xl p-4 bg-purple-50/30">
					<p className="text-sm font-semibold text-purple-700">
						Gallery Builder
					</p>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							value={galleryDesc}
							onChange={(e) => setGalleryDesc(e.target.value)}
							rows={3}
							placeholder="Short description of this gallery..."
							className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
						/>
					</div>

					{/* Image Library Picker */}
					<div className="flex flex-col gap-2">
						<button
							type="button"
							onClick={() => setLibraryOpen((o) => !o)}
							className="flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
						>
							<svg
								className={`w-4 h-4 transition-transform ${libraryOpen ? "rotate-90" : ""}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
							Pick from uploaded images
							<span className="text-xs text-purple-500 font-normal">
								({GALLERY_CATEGORIES.reduce((n, c) => n + c.items.length, 0)} available)
							</span>
						</button>

						{libraryOpen && (
							<div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
								{/* Category tabs */}
								<div className="flex gap-1 p-2 border-b border-gray-100 overflow-x-auto">
									{GALLERY_CATEGORIES.map((cat) => (
										<button
											key={cat.id}
											type="button"
											onClick={() => setLibraryCategory(cat.id)}
											className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
												libraryCategory === cat.id
													? "bg-purple-600 text-white"
													: "bg-gray-100 text-gray-600 hover:bg-gray-200"
											}`}
										>
											{cat.emoji} {cat.title}
										</button>
									))}
								</div>

								{/* Image grid */}
								{activeLibraryCat && (
									<div className="p-3 grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
										{activeLibraryCat.items.map((item, idx) => {
											const selected = galleryItems.some(
												(g) => g.url === item.url
											);
											return (
												<button
													key={idx}
													type="button"
													onClick={() => toggleLibraryItem(item)}
													className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
														selected
															? "border-purple-600 ring-2 ring-purple-300"
															: "border-transparent hover:border-gray-300"
													}`}
												>
													{item.type === "image" ? (
														<img
															src={item.url}
															alt=""
															className="w-full h-full object-cover"
															loading="lazy"
														/>
													) : (
														<div className="w-full h-full bg-gray-900 flex items-center justify-center">
															<svg
																className="w-5 h-5 text-white"
																fill="currentColor"
																viewBox="0 0 24 24"
															>
																<path d="M8 5v14l11-7z" />
															</svg>
														</div>
													)}
													{selected && (
														<div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
															<svg
																className="w-5 h-5 text-purple-700"
																fill="currentColor"
																viewBox="0 0 24 24"
															>
																<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
															</svg>
														</div>
													)}
												</button>
											);
										})}
									</div>
								)}
							</div>
						)}
					</div>

					{/* Add YouTube Video */}
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-medium text-gray-700">
							Add YouTube video
						</label>
						<div className="flex gap-2">
							<input
								type="url"
								value={youtubeInput}
								onChange={(e) => setYoutubeInput(e.target.value)}
								placeholder="https://youtube.com/watch?v=..."
								className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
							<button
								type="button"
								onClick={addYouTubeVideo}
								className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition-colors shrink-0"
							>
								Add
							</button>
						</div>
					</div>

					{/* Selected Items */}
					{galleryItems.length > 0 && (
						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-gray-700">
								Selected ({galleryItems.length})
							</p>
							<div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
								{galleryItems.map((item, idx) => {
									const ytThumb =
										item.type === "video"
											? getYouTubeThumb(item.url)
											: null;
									return (
										<div
											key={idx}
											className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-2"
										>
											<div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
												{item.type === "image" ? (
													<img
														src={item.url}
														alt=""
														className="w-full h-full object-cover"
														loading="lazy"
													/>
												) : ytThumb ? (
													<img
														src={ytThumb}
														alt=""
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full bg-gray-900 flex items-center justify-center">
														<svg
															className="w-4 h-4 text-white"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path d="M8 5v14l11-7z" />
														</svg>
													</div>
												)}
											</div>
											<input
												type="text"
												value={item.caption}
												onChange={(e) => updateCaption(idx, e.target.value)}
												placeholder="Caption (optional)"
												className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/30"
											/>
											<button
												type="button"
												onClick={() => removeGalleryItem(idx)}
												className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1"
												aria-label="Remove"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			) : (
				<>
					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-semibold text-gray-700">
							Content
						</label>
						<textarea
							name="content"
							value={textContent}
							onChange={(e) => setTextContent(e.target.value)}
							rows={12}
							placeholder="Write the post content here. Leave a blank line between paragraphs."
							className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-semibold text-gray-700">
							Thumbnail URL{" "}
							<span className="font-normal text-gray-400">(optional)</span>
						</label>
						<input
							type="url"
							name="thumbnail_url"
							defaultValue={post?.thumbnail_url ?? ""}
							placeholder="https://..."
							className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-sm font-semibold text-gray-700">
							Video URL{" "}
							<span className="font-normal text-gray-400">
								(YouTube link, optional)
							</span>
						</label>
						<input
							type="url"
							name="video_url"
							defaultValue={post?.video_url ?? ""}
							placeholder="https://youtube.com/watch?v=..."
							className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
						/>
					</div>
				</>
			)}

			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					id="published"
					name="published"
					defaultChecked={post?.published ?? false}
					className="w-4 h-4 accent-primary"
				/>
				<label
					htmlFor="published"
					className="text-sm font-semibold text-gray-700"
				>
					Publish immediately
				</label>
			</div>

			<div className="flex gap-3 pt-2 border-t border-gray-100">
				<button
					type="submit"
					disabled={pending}
					className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-opacity"
				>
					{pending ? "Saving..." : "Save Post"}
				</button>
				<Link
					href="/admin/posts"
					className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
				>
					Cancel
				</Link>
			</div>
		</form>
	);
}
