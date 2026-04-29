"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sanityWriteClient } from "@/lib/sanity-client";

export async function login(
	prevState: { error?: string } | null,
	formData: FormData
) {
	const password = formData.get("password") as string;

	if (password !== process.env.ADMIN_PASSWORD) {
		return { error: "Incorrect password" };
	}

	const cookieStore = await cookies();
	cookieStore.set("admin_session", process.env.ADMIN_SESSION_SECRET!, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	redirect("/admin/posts");
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete("admin_session");
	redirect("/admin/login");
}

async function uploadImage(file: File): Promise<string> {
	const buffer = Buffer.from(await file.arrayBuffer());
	const asset = await sanityWriteClient.assets.upload("image", buffer, {
		filename: file.name,
		contentType: file.type,
	});
	return asset._id;
}

export async function savePost(
	prevState: { error?: string } | null,
	formData: FormData
) {
	const id = formData.get("id") as string | null;
	const title = (formData.get("title") as string)?.trim();
	const slug = (formData.get("slug") as string)
		?.trim()
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, "");
	const category = formData.get("category") as string;
	const content = (formData.get("content") as string) ?? "";
	const videoUrl = (formData.get("video_url") as string)?.trim() || null;
	const published = formData.get("published") === "on";
	const existingPublishedAt = (formData.get("published_at") as string) || null;

	if (!title) return { error: "Title is required" };
	if (!slug) return { error: "Slug is required" };
	if (!category) return { error: "Category is required" };

	// Thumbnail
	const thumbnailFile = formData.get("thumbnail_file") as File | null;
	const thumbnailRefKeep = (formData.get("thumbnail_ref") as string) || null;
	let thumbnailRef: string | null = thumbnailRefKeep;

	if (thumbnailFile instanceof File && thumbnailFile.size > 0) {
		try {
			thumbnailRef = await uploadImage(thumbnailFile);
		} catch {
			return { error: "Failed to upload thumbnail" };
		}
	}

	// Images
	let keptImageRefs: string[] = [];
	try {
		keptImageRefs = JSON.parse((formData.get("image_refs_keep") as string) || "[]");
	} catch {}

	const newImageFiles = formData.getAll("images_new") as File[];
	const newImageRefs: string[] = [];
	for (const file of newImageFiles) {
		if (!(file instanceof File) || file.size === 0) continue;
		try {
			newImageRefs.push(await uploadImage(file));
		} catch {
			return { error: "Failed to upload one or more images" };
		}
	}

	const allImageRefs = [...keptImageRefs, ...newImageRefs];

	const publishedAt = published
		? existingPublishedAt || new Date().toISOString()
		: existingPublishedAt;

	const doc = {
		title,
		slug: { _type: "slug" as const, current: slug },
		category,
		content,
		...(thumbnailRef
			? {
					thumbnail: {
						_type: "image" as const,
						asset: { _type: "reference" as const, _ref: thumbnailRef },
					},
				}
			: {}),
		images: allImageRefs.map((ref, i) => ({
			_type: "image" as const,
			_key: `img${i}`,
			asset: { _type: "reference" as const, _ref: ref },
		})),
		videoUrl,
		published,
		publishedAt: publishedAt || null,
	};

	try {
		if (id) {
			await sanityWriteClient.patch(id).set(doc).commit();
		} else {
			const existing = await sanityWriteClient.fetch<string | null>(
				`*[_type == "post" && slug.current == $slug][0]._id`,
				{ slug }
			);
			if (existing) return { error: "Slug already in use" };
			await sanityWriteClient.create({ _type: "post", ...doc });
		}
	} catch (err: unknown) {
		return { error: (err as Error).message || "Failed to save post" };
	}

	revalidatePath("/updates");
	revalidatePath(`/updates/${slug}`);
	redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
	const id = formData.get("id") as string;
	const slug = formData.get("slug") as string;

	await sanityWriteClient.delete(id);

	revalidatePath("/updates");
	revalidatePath(`/updates/${slug}`);
	redirect("/admin/posts");
}
