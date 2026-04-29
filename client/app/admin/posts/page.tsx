import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { DeleteButton } from "./delete-button";

export const dynamic = "force-dynamic";

const CATEGORY_STYLES: Record<string, string> = {
	news: "bg-blue-100 text-blue-700",
	achievement: "bg-yellow-100 text-yellow-700",
	video: "bg-red-100 text-red-700",
};

export default async function AdminPostsPage() {
	const { data: posts } = await supabaseAdmin
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false });

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Posts</h1>
				<Link
					href="/admin/posts/new"
					className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
				>
					+ New Post
				</Link>
			</div>

			{!posts?.length ? (
				<div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
					<p className="text-gray-400 text-sm">
						No posts yet.{" "}
						<Link href="/admin/posts/new" className="text-primary hover:underline">
							Create your first one.
						</Link>
					</p>
				</div>
			) : (
				<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-200">
							<tr>
								<th className="text-left px-5 py-3 font-semibold text-gray-600">
									Title
								</th>
								<th className="text-left px-5 py-3 font-semibold text-gray-600">
									Category
								</th>
								<th className="text-left px-5 py-3 font-semibold text-gray-600">
									Status
								</th>
								<th className="text-left px-5 py-3 font-semibold text-gray-600">
									Date
								</th>
								<th className="px-5 py-3" />
							</tr>
						</thead>
						<tbody>
							{posts.map((post, i) => (
								<tr
									key={post.id}
									className={
										i < posts.length - 1 ? "border-b border-gray-100" : ""
									}
								>
									<td className="px-5 py-3.5 font-medium text-gray-900 max-w-xs truncate">
										{post.title}
									</td>
									<td className="px-5 py-3.5">
										<span
											className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-gray-600"}`}
										>
											{post.category}
										</span>
									</td>
									<td className="px-5 py-3.5">
										<span
											className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
										>
											{post.published ? "Published" : "Draft"}
										</span>
									</td>
									<td className="px-5 py-3.5 text-gray-500">
										{new Date(
											post.published_at ?? post.created_at
										).toLocaleDateString("en-IN", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</td>
									<td className="px-5 py-3.5">
										<div className="flex items-center gap-4 justify-end">
											<Link
												href={`/admin/posts/${post.id}/edit`}
												className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
											>
												Edit
											</Link>
											<DeleteButton id={post.id} slug={post.slug} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
