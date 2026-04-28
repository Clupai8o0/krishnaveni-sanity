import Link from "next/link";
import Image from "next/image";
import { logout } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-8">
					<Link href="/admin/posts">
						<Image
							src="/logo-desktop-light.svg"
							alt="Krishnaveni Admin"
							width={120}
							height={18}
						/>
					</Link>
					<nav>
						<Link
							href="/admin/posts"
							className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
						>
							Posts
						</Link>
					</nav>
				</div>

				<form action={logout}>
					<button
						type="submit"
						className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
					>
						Logout
					</button>
				</form>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
		</div>
	);
}
