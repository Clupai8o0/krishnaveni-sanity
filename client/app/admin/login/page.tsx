"use client";

import { useActionState } from "react";
import { login } from "../actions";
import Image from "next/image";

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
				<div className="flex flex-col items-center mb-8">
					<Image
						src="/logo-desktop-light.svg"
						alt="Logo"
						width={140}
						height={20}
						className="mb-5"
					/>
					<h1 className="text-lg font-semibold text-gray-800">Admin Portal</h1>
				</div>

				<form action={formAction} className="flex flex-col gap-4">
					{state?.error && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
							{state.error}
						</p>
					)}

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							autoFocus
							className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
						/>
					</div>

					<button
						type="submit"
						disabled={pending}
						className="mt-2 bg-primary text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-opacity"
					>
						{pending ? "Signing in..." : "Sign In"}
					</button>
				</form>
			</div>
		</div>
	);
}
