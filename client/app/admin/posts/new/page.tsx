import Link from "next/link";
import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
	return (
		<div>
			<div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
				<Link href="/admin/posts" className="hover:text-gray-800 transition-colors">
					Posts
				</Link>
				<span>/</span>
				<span className="text-gray-900 font-medium">New Post</span>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 p-6">
				<PostForm />
			</div>
		</div>
	);
}
