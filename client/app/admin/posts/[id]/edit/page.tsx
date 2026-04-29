import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityWriteClient, POST_BY_ID_QUERY, Post } from "@/lib/sanity-client";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post: Post | null = await sanityWriteClient.fetch(POST_BY_ID_QUERY, { id });

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
