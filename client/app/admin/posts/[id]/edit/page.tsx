import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { data: post } = await supabaseAdmin
		.from("posts")
		.select("*")
		.eq("id", id)
		.single();

	if (!post) notFound();

	return (
		<div>
			<div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
				<Link href="/admin/posts" className="hover:text-gray-800 transition-colors">
					Posts
				</Link>
				<span>/</span>
				<span className="text-gray-900 font-medium truncate max-w-xs">
					{post.title}
				</span>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<PostForm post={post} />
			</div>
		</div>
	);
}
