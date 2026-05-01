"use client";

import { useState, useEffect, useCallback } from "react";
import type { GalleryItem } from "@/lib/gallery-data";

type Props = {
	items: GalleryItem[];
};

function getYouTubeId(url: string): string | null {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
	);
	return match ? match[1] : null;
}

function isLocalVideo(url: string): boolean {
	return /\.(mp4|webm|mov|ogg)$/i.test(url);
}

function PlayIcon() {
	return (
		<div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
			<svg
				className="w-5 h-5 text-gray-900 ml-0.5"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M8 5v14l11-7z" />
			</svg>
		</div>
	);
}

function GridItem({
	item,
	onClick,
}: {
	item: GalleryItem;
	onClick: () => void;
}) {
	const ytId = item.type === "video" ? getYouTubeId(item.url) : null;

	return (
		<div
			onClick={onClick}
			className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group mb-2"
		>
			{item.type === "image" ? (
				<img
					src={item.url}
					alt={item.caption ?? ""}
					loading="lazy"
					className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"
				/>
			) : (
				<div className="relative aspect-video bg-gray-900 overflow-hidden">
					{ytId && (
						<img
							src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
							alt={item.caption ?? "Video"}
							className="absolute inset-0 w-full h-full object-cover"
						/>
					)}
					<div className="absolute inset-0 flex items-center justify-center bg-black/30">
						<PlayIcon />
					</div>
					{!ytId && (
						<div className="absolute inset-0 flex items-center justify-center">
							<PlayIcon />
						</div>
					)}
				</div>
			)}
			{item.caption && (
				<div className="absolute bottom-0 inset-x-0 px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
					{item.caption}
				</div>
			)}
		</div>
	);
}

function LightboxMedia({ item }: { item: GalleryItem }) {
	if (item.type === "image") {
		return (
			<img
				src={item.url}
				alt={item.caption ?? ""}
				className="max-h-[82vh] max-w-full object-contain rounded-lg"
			/>
		);
	}
	const ytId = getYouTubeId(item.url);
	if (ytId) {
		return (
			<div className="w-[min(900px,85vw)] aspect-video">
				<iframe
					src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
					allow="autoplay; fullscreen"
					allowFullScreen
					className="w-full h-full rounded-lg"
					title={item.caption ?? "Video"}
				/>
			</div>
		);
	}
	if (isLocalVideo(item.url)) {
		return (
			<video
				src={item.url}
				controls
				autoPlay
				className="max-h-[82vh] max-w-full rounded-lg"
			/>
		);
	}
	return null;
}

export default function GalleryGrid({ items }: Props) {
	const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

	const close = useCallback(() => setLightboxIdx(null), []);
	const prev = useCallback(
		() =>
			setLightboxIdx((i) =>
				i !== null ? (i - 1 + items.length) % items.length : null
			),
		[items.length]
	);
	const next = useCallback(
		() =>
			setLightboxIdx((i) =>
				i !== null ? (i + 1) % items.length : null
			),
		[items.length]
	);

	useEffect(() => {
		if (lightboxIdx === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			else if (e.key === "ArrowLeft") prev();
			else if (e.key === "ArrowRight") next();
		};
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [lightboxIdx, close, prev, next]);

	const current = lightboxIdx !== null ? items[lightboxIdx] : null;

	return (
		<>
			<div className={`gap-2 ${items.length === 1 ? "columns-1" : items.length === 2 ? "columns-1 md:columns-2" : "columns-2 md:columns-3"}`}>
				{items.map((item, idx) => (
					<GridItem
						key={idx}
						item={item}
						onClick={() => setLightboxIdx(idx)}
					/>
				))}
			</div>

			{current !== null && lightboxIdx !== null && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
					onClick={close}
				>
					<button
						onClick={close}
						className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors"
						aria-label="Close"
					>
						<svg
							className="w-7 h-7"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm tabular-nums select-none">
						{lightboxIdx + 1} / {items.length}
					</div>

					{items.length > 1 && (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									prev();
								}}
								className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
								aria-label="Previous"
							>
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									next();
								}}
								className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
								aria-label="Next"
							>
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</>
					)}

					<div
						className="flex flex-col items-center gap-3 max-w-5xl"
						onClick={(e) => e.stopPropagation()}
					>
						<LightboxMedia item={current} />
						{current.caption && (
							<p className="text-white/60 text-sm text-center">
								{current.caption}
							</p>
						)}
					</div>
				</div>
			)}
		</>
	);
}
