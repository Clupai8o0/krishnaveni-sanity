/**
 * Seed script: uploads facility images to Sanity and creates facility documents.
 * Run: SANITY_API_TOKEN=<your-token> node studio/scripts/seed-facilities.mjs
 *
 * Get a write token at: https://sanity.io/manage → project → API → Tokens
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Error: SANITY_API_TOKEN env var is required.");
  console.error("Get a write token at: https://sanity.io/manage → API → Tokens");
  process.exit(1);
}

const client = createClient({
  projectId: "jzbduz09",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const FACILITIES = [
  {
    title: "Playroom",
    description: "Dedicated playroom for early learners with age-appropriate activities.",
    icon: "gamepad-2",
    color: "#E74C3C",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1576617057924-d4d4fe4b6c7d?w=800&q=80",
    order: 1,
  },
  {
    title: "Playground",
    description: "Spacious outdoor playground for physical activity and team sports.",
    icon: "trees",
    color: "#27AE60",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&q=80",
    order: 2,
  },
  {
    title: "Library",
    description: "Well-stocked library encouraging a love for reading and research.",
    icon: "library",
    color: "#8E44AD",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
    order: 3,
  },
  {
    title: "Composite Lab",
    description: "Fully equipped science composite lab for hands-on experiments.",
    icon: "flask-conical",
    color: "#2980B9",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80",
    order: 4,
  },
  {
    title: "LED Projector & LCD TVs",
    description: "Smart classrooms with LED projectors and LCD TVs for interactive learning.",
    icon: "monitor",
    color: "#2C3E50",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    order: 5,
  },
  {
    title: "Activity Room",
    description: "Dedicated space for arts, crafts, and extracurricular activities.",
    icon: "palette",
    color: "#E67E22",
    category: "Arts",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    order: 6,
  },
  {
    title: "Computer Lab",
    description: "Modern computer lab with high-speed internet access for digital learning.",
    icon: "monitor-check",
    color: "#16A085",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    order: 7,
  },
  {
    title: "Separate Washrooms",
    description: "Clean, safe, and separate washroom facilities for boys and girls.",
    icon: "building-2",
    color: "#7F8C8D",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    order: 8,
  },
  {
    title: "AI-Based Learning",
    description: "Cutting-edge AI-powered tools integrated into the curriculum.",
    icon: "cpu",
    color: "#2951E0",
    category: "AI & Tech",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    order: 9,
  },
  {
    title: "Vedic Maths & IIT Foundation",
    description: "Strong foundation in mathematics through Vedic techniques and IIT prep.",
    icon: "calculator",
    color: "#F5A623",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    order: 10,
  },
  {
    title: "Abacus",
    description: "Abacus training to sharpen mental arithmetic and concentration.",
    icon: "hash",
    color: "#E8B84B",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    order: 11,
  },
  {
    title: "Coding & Robotics",
    description: "Hands-on coding and robotics classes for future-ready learners.",
    icon: "bot",
    color: "#1ABC9C",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    order: 12,
  },
  {
    title: "Karate",
    description: "Structured karate training building discipline, fitness, and confidence.",
    icon: "shield",
    color: "#E74C3C",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80",
    order: 13,
  },
  {
    title: "Special Classes",
    description: "Remedial and advanced special classes tailored to individual learning needs.",
    icon: "graduation-cap",
    color: "#9B59B6",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    order: 14,
  },
  {
    title: "Bus Transport",
    description: "Safe and reliable bus transport to and from nearby locations.",
    icon: "bus",
    color: "#2ECC71",
    category: "Transport",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
    order: 15,
  },
];

async function uploadImage(url, filename) {
  console.log(`  Downloading ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  console.log(`  Uploading ${filename} to Sanity...`);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function seedFacilities() {
  console.log("Checking for existing facility documents...");
  const existing = await client.fetch('*[_type == "facility"]{ _id, title }');
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing facility documents. Delete them first if you want to re-seed.`);
    console.log("Existing:", existing.map((d) => d.title).join(", "));
    process.exit(0);
  }

  console.log(`\nSeeding ${FACILITIES.length} facilities...\n`);

  for (const f of FACILITIES) {
    console.log(`[${f.order}/${FACILITIES.length}] ${f.title}`);
    try {
      const assetId = await uploadImage(f.imageUrl, `facility-${f.icon}.jpg`);

      await client.create({
        _type: "facility",
        title: f.title,
        description: f.description,
        icon: f.icon,
        color: f.color,
        category: f.category,
        order: f.order,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      });

      console.log(`  ✓ Created\n`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}\n`);
    }
  }

  console.log("Done!");
}

seedFacilities().catch((err) => {
  console.error(err);
  process.exit(1);
});
