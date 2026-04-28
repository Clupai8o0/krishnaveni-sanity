"use client";

import { deletePost } from "../actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
	return (
		<form
			action={deletePost}
			onSubmit={(e) => {
				if (!confirm("Delete this post? This cannot be undone.")) {
					e.preventDefault();
				}
			}}
		>
			<input type="hidden" name="id" value={id} />
			<input type="hidden" name="slug" value={slug} />
			<button
				type="submit"
				className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
			>
				Delete
			</button>
		</form>
	);
}
