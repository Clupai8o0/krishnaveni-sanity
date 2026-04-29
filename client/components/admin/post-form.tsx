"use client";

import { useState } from "react";
import { useActionState } from "react";
import { savePost } from "@/app/admin/actions";
import { Post } from "@/lib/sanity-client";
import Link from "next/link";

function toSlug(str: string) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function PostForm({ post }: { post?: Post }) {
	const [state, formAction, pending] = useActionState(savePost, null);
	const [title, setTitle] = useState(post?.title ?? "");
	const [slug, setSlug] = useState(post?.slug ?? "");
	const [slugLocked, setSlugLocked] = useState(!!post);

	const [keptRefs, setKeptRefs] = useState<string[]>(
		(post?.imageRefs ?? []).filter(Boolean) as string[]
	);
	const [keptUrls, setKeptUrls] = useState<string[]>(
		(post?.images ?? []).filter(Boolean) as string[]
	);

	const removeImage = (index: number) => {
		setKeptRefs((prev) => prev.filter((_, i) => i !== index));
		setKeptUrls((prev) => prev.filter((_, i) => i !== index));
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		if (!slugLocked) setSlug(toSlug(e.target.value));
	};

	return (
		<form action={formAction} encType="multipart/form-data" className="flex flex-col gap-5">
			{post && <input type="hidden" name="id" value={post._id} />}
			{post && <input type="hidden" name="published_at" value={post.publishedAt ?? ""} />}

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
				<label className="text-sm font-semibold text-gray-700">Category *</label>
				<select
					name="category"
					defaultValue={post?.category ?? "news"}
					className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
				>
					<option value="news">News</option>
					<option value="achievement">Achievement</option>
					<option value="video">Video</option>
				</select>
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-semibold text-gray-700">Content</label>
				<textarea
					name="content"
					defaultValue={post?.content ?? ""}
					rows={12}
					placeholder="Write the post content here. Leave a blank line between paragraphs."
					className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-semibold text-gray-700">
					Thumbnail{" "}
					<span className="font-normal text-gray-400">(optional)</span>
				</label>
				{post?.thumbnailRef && (
					<input type="hidden" name="thumbnail_ref" value={post.thumbnailRef} />
				)}
				{post?.thumbnailUrl && (
					<img
						src={post.thumbnailUrl}
						alt="Current thumbnail"
						className="h-28 w-48 object-cover rounded-lg border border-gray-200"
					/>
				)}
				<input
					type="file"
					name="thumbnail_file"
					accept="image/*"
					className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
				/>
				{post?.thumbnailUrl && (
					<p className="text-xs text-gray-400">
						Upload a new file to replace the existing thumbnail.
					</p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-semibold text-gray-700">
					Images{" "}
					<span className="font-normal text-gray-400">
						(1 = side-by-side with text, 2 = 2-col masonry, 3+ = 3-col masonry)
					</span>
				</label>
				<input
					type="hidden"
					name="image_refs_keep"
					value={JSON.stringify(keptRefs)}
				/>
				{keptUrls.length > 0 && (
					<div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
						{keptUrls.map((url, i) => (
							<div key={i} className="relative group">
								<img
									src={url}
									alt=""
									className="h-20 w-20 object-cover rounded-lg"
								/>
								<button
									type="button"
									onClick={() => removeImage(i)}
									className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold shadow"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<input
					type="file"
					name="images_new"
					accept="image/*"
					multiple
					className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
				/>
				<p className="text-xs text-gray-400">
					Select multiple files at once to upload several images.
				</p>
			</div>

			<div className="flex flex-col gap-1.5">
				<label className="text-sm font-semibold text-gray-700">
					Video URL{" "}
					<span className="font-normal text-gray-400">(YouTube link, optional)</span>
				</label>
				<input
					type="url"
					name="video_url"
					defaultValue={post?.videoUrl ?? ""}
					placeholder="https://youtube.com/watch?v=..."
					className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
				/>
			</div>

			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					id="published"
					name="published"
					defaultChecked={post?.published ?? false}
					className="w-4 h-4 accent-primary"
				/>
				<label htmlFor="published" className="text-sm font-semibold text-gray-700">
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
