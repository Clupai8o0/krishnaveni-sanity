"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

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
	const thumbnail_url = (formData.get("thumbnail_url") as string)?.trim() || null;
	const video_url = (formData.get("video_url") as string)?.trim() || null;
	const published = formData.get("published") === "on";

	if (!title) return { error: "Title is required" };
	if (!slug) return { error: "Slug is required" };
	if (!category) return { error: "Category is required" };

	if (id) {
		const { data: existing } = await supabaseAdmin
			.from("posts")
			.select("published_at")
			.eq("id", id)
			.single();

		const { error } = await supabaseAdmin
			.from("posts")
			.update({
				title,
				slug,
				category,
				content,
				thumbnail_url,
				video_url,
				published,
				published_at:
					published && !existing?.published_at
						? new Date().toISOString()
						: existing?.published_at ?? null,
				updated_at: new Date().toISOString(),
			})
			.eq("id", id);

		if (error) {
			if (error.code === "23505") return { error: "Slug already in use" };
			return { error: error.message };
		}
	} else {
		const { error } = await supabaseAdmin.from("posts").insert({
			title,
			slug,
			category,
			content,
			thumbnail_url,
			video_url,
			published,
			published_at: published ? new Date().toISOString() : null,
		});

		if (error) {
			if (error.code === "23505") return { error: "Slug already in use" };
			return { error: error.message };
		}
	}

	revalidatePath("/updates");
	revalidatePath(`/updates/${slug}`);
	redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
	const id = formData.get("id") as string;
	const slug = formData.get("slug") as string;

	await supabaseAdmin.from("posts").delete().eq("id", id);

	revalidatePath("/updates");
	revalidatePath(`/updates/${slug}`);
	redirect("/admin/posts");
}
