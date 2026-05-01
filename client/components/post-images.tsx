"use client";

import { useState, useEffect, useCallback } from "react";

type MediaItem = { type: "image"; url: string } | { type: "video"; url: string };

export function PostImages({ images, videos }: { images?: string[]; videos?: string[] }) {
	const media: MediaItem[] = [
		...(images ?? []).map((url): MediaItem => ({ type: "image", url })),
		...(videos ?? []).map((url): MediaItem => ({ type: "video", url })),
	];

	const [lightbox, setLightbox] = useState<number | null>(null);

	const close = useCallback(() => setLightbox(null), []);
	const prev = useCallback(
		() => setLightbox((i) => (i !== null ? (i - 1 + media.length) % media.length : null)),
		[media.length]
	);
	const next = useCallback(
		() => setLightbox((i) => (i !== null ? (i + 1) % media.length : null)),
		[media.length]
	);

	useEffect(() => {
		if (lightbox === null) return;
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
	}, [lightbox, close, prev, next]);

	if (!media.length) return null;

	const colClass =
		media.length === 1
			? "columns-1"
			: media.length === 2
			? "columns-1 md:columns-2"
			: "columns-2 md:columns-3";

	return (
		<>
			<div className={`${colClass} gap-3 mt-8`}>
				{media.map((item, i) => (
					<div
						key={i}
						onClick={() => setLightbox(i)}
						className="break-inside-avoid mb-3 rounded-xl overflow-hidden cursor-zoom-in group"
					>
						{item.type === "video" ? (
							<div className="relative">
								<video
									src={item.url}
									className="w-full h-auto block"
									muted
									playsInline
									preload="metadata"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
									<div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
										<svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</div>
							</div>
						) : (
							<img
								src={item.url}
								alt=""
								loading="lazy"
								className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
							/>
						)}
					</div>
				))}
			</div>

			{lightbox !== null && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
					onClick={close}
				>
					<button
						onClick={close}
						className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors"
						aria-label="Close"
					>
						<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					{media.length > 1 && (
						<>
							<button
								onClick={(e) => { e.stopPropagation(); prev(); }}
								className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
								aria-label="Previous"
							>
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								onClick={(e) => { e.stopPropagation(); next(); }}
								className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
								aria-label="Next"
							>
								<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</>
					)}

					<div
						className="flex flex-col items-center gap-3 max-w-5xl"
						onClick={(e) => e.stopPropagation()}
					>
						{media[lightbox].type === "video" ? (
							<video
								src={media[lightbox].url}
								controls
								autoPlay
								className="max-h-[85vh] max-w-full rounded-lg"
							/>
						) : (
							<img
								src={media[lightbox].url}
								alt=""
								className="max-h-[85vh] max-w-full object-contain rounded-lg"
							/>
						)}
						{media.length > 1 && (
							<p className="text-white/40 text-sm tabular-nums select-none">
								{lightbox + 1} / {media.length}
							</p>
						)}
					</div>
				</div>
			)}
		</>
	);
}
