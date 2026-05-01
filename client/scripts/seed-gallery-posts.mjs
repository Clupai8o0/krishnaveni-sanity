/**
 * Uploads all static gallery categories to Sanity as posts.
 * Skips any that already exist (by slug).
 * Run: node scripts/seed-gallery-posts.mjs
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { createReadStream, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, "..");
const upgradeDir = resolve(clientDir, "public/upgrade");

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

async function uploadImage(absolutePath, filename) {
  const stream = createReadStream(absolutePath);
  const asset = await client.assets.upload("image", stream, {
    filename,
    contentType: "image/jpeg",
  });
  console.log(`    ✓ ${filename} → ${asset._id}`);
  return asset._id;
}

// Each entry: slug, title, category, description, publishedAt, imageFiles (relative to upgradeDir or absolute)
const CATEGORIES = [
  {
    slug: "karate-achievements-2025",
    title: "Karate Achievements 2025",
    category: "achievements",
    description:
      "M. Saanvi and P. Devisree (5th Class) achieved recognition in the Limca Book of Records. Other students also earned Karate certifications, showcasing discipline and dedication.",
    publishedAt: "2025-03-01T09:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "karate", "WhatsApp Image 2026-04-22 at 12.42.41 (2).jpeg"),
      resolve(upgradeDir, "karate", "WhatsApp Image 2026-04-22 at 12.42.42.jpeg"),
      resolve(upgradeDir, "karate", "WhatsApp Image 2026-04-22 at 12.42.44 (2).jpeg"),
      resolve(upgradeDir, "karate", "WhatsApp Image 2026-04-22 at 12.42.46.jpeg"),
      resolve(upgradeDir, "karate", "WhatsApp Image 2026-04-22 at 12.42.48 (1).jpeg"),
    ],
  },
  {
    slug: "limca-book-of-records-2025",
    title: "Limca Book of Records 2025",
    category: "achievements",
    description:
      "Recognition in the prestigious Limca Book of Records for outstanding achievements.",
    publishedAt: "2025-03-01T10:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "limca-awards", "WhatsApp Image 2026-04-22 at 12.42.46 (3).jpeg"),
    ],
  },
  {
    slug: "robotics-club-2025",
    title: "Robotics Club 2025",
    category: "achievements",
    description:
      "Students secured certifications and medals in Robotics, demonstrating innovation, creativity, and technical skills.",
    publishedAt: "2025-03-01T11:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "robotics-club", "WhatsApp Image 2026-04-22 at 12.42.39 (2).jpeg"),
      resolve(upgradeDir, "robotics-club", "WhatsApp Image 2026-04-22 at 12.42.47 (1).jpeg"),
      resolve(upgradeDir, "robotics-club", "WhatsApp Image 2026-04-28 at 22.42.14.jpeg"),
      resolve(upgradeDir, "robotics-club", "WhatsApp Image 2026-04-28 at 22.42.26.jpeg"),
      resolve(upgradeDir, "robotics-club", "WhatsApp Image 2026-04-28 at 22.42.41.jpeg"),
    ],
  },
  {
    slug: "eco-club-2025",
    title: "Eco Club 2025",
    category: "achievements",
    description:
      "Active involvement in National Green Corps (Eco Club) activities and receipt of Eco Club certificates.",
    publishedAt: "2025-03-01T12:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "eco-club", "WhatsApp Image 2026-04-22 at 12.42.47 (2).jpeg"),
      resolve(upgradeDir, "eco-club.jpeg"),
    ],
  },
  {
    slug: "certifications-2025",
    title: "Student Certifications 2025",
    category: "achievements",
    description:
      "Student achievement certifications across various programs including Vedic Maths, IIT Foundation, and Abacus.",
    publishedAt: "2025-03-01T13:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "certifications", "WhatsApp Image 2026-04-22 at 12.42.43 (1).jpeg"),
      resolve(upgradeDir, "certifications", "WhatsApp Image 2026-04-22 at 12.42.45 (2).jpeg"),
    ],
  },
  {
    slug: "tata-building-india-2025",
    title: "Tata Building India 2025",
    category: "achievements",
    description:
      "Participation & recognition in programs conducted at Tata Group initiatives (Tata Building India activities).",
    publishedAt: "2025-03-01T14:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "english-certificate-tata.jpeg"),
    ],
  },
  {
    slug: "celebrations-2025",
    title: "School Celebrations 2025",
    category: "celebrations",
    description:
      "School celebrations and special occasions bringing the community together.",
    publishedAt: "2025-03-01T15:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.41 (1).jpeg"),
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.42 (3).jpeg"),
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.43 (2).jpeg"),
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.44 (1).jpeg"),
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.45 (1).jpeg"),
      resolve(upgradeDir, "celebrations", "WhatsApp Image 2026-04-22 at 12.42.49 (2).jpeg"),
    ],
  },
  {
    slug: "field-trips-2025",
    title: "Field Trips 2025",
    category: "field-trips",
    description:
      "Educational field trips enriching students' learning experiences.",
    publishedAt: "2025-03-01T16:00:00.000Z",
    imageFiles: [
      resolve(upgradeDir, "field-trip", "WhatsApp Image 2026-04-22 at 12.42.39 (1).jpeg"),
      resolve(upgradeDir, "field-trip", "WhatsApp Image 2026-04-22 at 12.42.40 (1).jpeg"),
      resolve(upgradeDir, "field-trip", "WhatsApp Image 2026-04-22 at 12.42.40 (2).jpeg"),
      resolve(upgradeDir, "field-trip", "WhatsApp Image 2026-04-22 at 12.42.48 (2).jpeg"),
    ],
  },
  {
    slug: "teacher-development-2025",
    title: "Teacher Development 2025",
    category: "teacher-development",
    description:
      "Professional development programs keeping our teachers at the forefront of education.",
    publishedAt: "2025-03-01T17:00:00.000Z",
    imageFiles: [
      resolve(
        upgradeDir,
        "professional-development-for-teacher",
        "WhatsApp Image 2026-04-22 at 12.42.49 (1).jpeg"
      ),
    ],
  },
];

for (const cat of CATEGORIES) {
  console.log(`\n── ${cat.title}`);

  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]._id`,
    { slug: cat.slug }
  );
  if (existing) {
    console.log("  Already exists — skipping.");
    continue;
  }

  // Filter to only files that exist on disk
  const validFiles = cat.imageFiles.filter((f) => {
    if (!existsSync(f)) {
      console.warn(`  ⚠ Missing file: ${f}`);
      return false;
    }
    return true;
  });

  if (validFiles.length === 0) {
    console.warn("  No valid images — skipping.");
    continue;
  }

  console.log(`  Uploading ${validFiles.length} image(s)...`);
  const refs = [];
  for (const filePath of validFiles) {
    const filename = filePath.split("/").pop();
    refs.push(await uploadImage(filePath, filename));
  }

  const [thumbnailRef, ...restRefs] = refs;

  await client.create({
    _type: "post",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    category: cat.category,
    content: cat.description,
    thumbnail: {
      _type: "image",
      asset: { _type: "reference", _ref: thumbnailRef },
    },
    images: restRefs.map((ref, i) => ({
      _type: "image",
      _key: `img${i}`,
      asset: { _type: "reference", _ref: ref },
    })),
    published: true,
    publishedAt: cat.publishedAt,
  });

  console.log(`  ✓ Created post: ${cat.slug}`);
}

console.log("\n✓ Done seeding gallery posts.");
