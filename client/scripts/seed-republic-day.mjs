/**
 * Uploads Republic Day 2026 images to Sanity and creates the post.
 * Run once: node scripts/seed-republic-day.mjs
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { createReadStream, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, "..");

function loadEnv() {
	for (const name of [".env", ".env.local"]) {
		try {
			const text = readFileSync(resolve(clientDir, name), "utf8");
			for (const line of text.split("\n")) {
				const idx = line.indexOf("=");
				if (idx === -1 || line.startsWith("#")) continue;
				const key = line.slice(0, idx).trim();
				const val = line.slice(idx + 1).trim();
				if (!process.env[key]) process.env[key] = val;
			}
		} catch {}
	}
}

loadEnv();

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-01-01",
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

const rdDir = resolve(clientDir, "public/upgrade/republic-day");

const imageFiles = [
	"WhatsApp Image 2026-04-22 at 12.42.29 (2).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.29 (5).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.30 (1).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.30 (2).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.30 (3).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.30.jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.31 (1).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.31 (2).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.31 (3).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.31.jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.32 (1).jpeg",
	"WhatsApp Image 2026-04-22 at 12.42.32.jpeg",
];

async function uploadFile(filename) {
	const stream = createReadStream(resolve(rdDir, filename));
	const asset = await client.assets.upload("image", stream, {
		filename,
		contentType: "image/jpeg",
	});
	console.log(`  ✓ Uploaded: ${filename} → ${asset._id}`);
	return asset._id;
}

console.log("Checking for existing Republic Day post...");
const existing = await client.fetch(
	`*[_type == "post" && slug.current == "republic-day-2026"][0]._id`
);
if (existing) {
	console.log("Post already exists — skipping.");
	process.exit(0);
}

console.log(`\nUploading ${imageFiles.length} images to Sanity...`);
const imageRefs = [];
for (const file of imageFiles) {
	imageRefs.push(await uploadFile(file));
}

const [thumbnailRef, ...restRefs] = imageRefs;

console.log("\nCreating Republic Day 2026 post...");
await client.create({
	_type: "post",
	title: "Republic Day Celebrations 2026",
	slug: { _type: "slug", current: "republic-day-2026" },
	category: "achievement",
	content:
		"Krishnaveni School celebrated Republic Day 2026 with immense pride and patriotic fervour. Students and staff gathered to honour the 77th Republic Day of India with a flag hoisting ceremony, cultural performances, and heartfelt speeches.\n\nThe event showcased the rich diversity and unity of our school community. Students performed patriotic songs and dances, reminding everyone of the values enshrined in our Constitution.\n\nThe celebration concluded with a heartfelt national anthem, leaving every participant with a renewed sense of pride and commitment to our great nation.",
	thumbnail: {
		_type: "image",
		asset: { _type: "reference", _ref: thumbnailRef },
	},
	images: restRefs.map((ref, i) => ({
		_type: "image",
		_key: `img${i}`,
		asset: { _type: "reference", _ref: ref },
	})),
	videoUrl: null,
	published: true,
	publishedAt: "2026-01-26T09:00:00.000Z",
});

console.log("\n✓ Republic Day 2026 post created successfully.");
