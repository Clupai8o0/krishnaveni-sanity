import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientDir = resolve(__dirname, "..");

function loadEnv(envPath) {
  const vars = {};
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      vars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  } catch {
    // file doesn't exist — skip
  }
  return vars;
}

const env = {
  ...loadEnv(join(clientDir, ".env")),
  ...loadEnv(join(clientDir, ".env.local")),
};

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET");
  process.exit(1);
}

console.log(`Connecting to Sanity: project=${projectId} dataset=${dataset}`);

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: false });

async function safeQuery(label, query, params = {}) {
  try {
    const result = await client.fetch(query, params);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      console.warn(`⚠  ${label}: returned empty/null`);
    } else {
      console.log(`✓  ${label}: OK`);
    }
    return result;
  } catch (err) {
    console.warn(`⚠  ${label}: query failed — ${err.message}`);
    return null;
  }
}

const PAGES_QUERY = `
*[_type == "page" && language == "en"]{
  pageType,
  language,
  seo,
  content[]{
    ...,
    _type == "heroSection" => {
      title, subtitle, description,
      "imageUrl": images{ "desktop": desktop.asset->url, "mobile": mobile.asset->url },
      "ctaBtns": ctaBtns.buttons[]{ label, style, externalLink, "internalPage": internalLink->{ "slug": slug.current } }
    },
    _type == "introduction" => {
      title, description,
      "imageUrl": image.asset->url,
      facts[]{ title, description, icon },
      "ctaBtns": ctaBtns.buttons[]{ label, style, externalLink, "internalPage": internalLink->{ "slug": slug.current } }
    },
    _type == "bentoGallery" => {
      title,
      "imageUrl": images[]{ label, "mobileImage": mobileImage.asset->url, "desktopImage": desktopImage.asset->url },
      "ctaBtns": ctaBtns.buttons[]{ label, style, externalLink, "internalPage": internalLink->{ "slug": slug.current } }
    },
    _type == "testimonials" => {
      title,
      testimonials[]{ "video": video.asset->url, "thumbnail": thumbnail.asset->url, author, authorTitle }
    },
    _type == "twoColLayout" => {
      title, reverse, imageFit, content,
      "imageUrl": image.asset->url
    },
    _type == "centerLayout" => { title, content },
    _type == "featureCards" => { title, cards[]{ title, description, icon, color } },
    _type == "faq" => { title, faqs[]{ question, answer } },
    _type == "visionMission" => { title, vision{ title, content }, mission{ title, content } },
    _type == "uniqueCards" => { title, cards[]{ title, description, icon, color } },
    _type == "contact" => {
      transport{ title, subtext },
      workingHours{ title, subtext, monFri, sat, sun },
      contact{ title, email, facebook, phone, subtext, whatsapp },
      address{ title, address, map, subtext }
    }
  }
}`;

const MESSAGE_PAGES_QUERY = `
*[_type == "messagePage" && language == "en"]{
  pageType, name, designation,
  "imageUrl": image.asset->url,
  content,
  seo
}`;

const NAVIGATION_QUERY = `
*[_type == "navigation" && language == "en"][0]{
  title,
  navLinks[]{ label, "link": link->{ "slug": slug.current } },
  cta{ label, "link": link->{ "slug": slug.current } }
}`;

const CTA_QUERY = `
*[_type == "cta" && language == "en"][0]{
  title, description,
  "ctaBtns": ctaBtns.buttons[]{ label, style, externalLink, "internalPage": internalLink->{ "slug": slug.current } },
  "imageUrl": images{ "desktop": desktop.asset->url, "mobile": mobile.asset->url }
}`;

const rawPages = await safeQuery("pages", PAGES_QUERY);
const rawMessagePages = await safeQuery("messagePages", MESSAGE_PAGES_QUERY);
const navigation = await safeQuery("navigation", NAVIGATION_QUERY);
const cta = await safeQuery("cta", CTA_QUERY);

// Index pages by pageType for easy lookup
const pages = {};
if (Array.isArray(rawPages)) {
  for (const page of rawPages) {
    if (page?.pageType) {
      const { pageType, language, ...rest } = page;
      pages[pageType] = rest;
    }
  }
}

const messagePages = {};
if (Array.isArray(rawMessagePages)) {
  for (const page of rawMessagePages) {
    if (page?.pageType) {
      const { pageType, ...rest } = page;
      messagePages[pageType] = rest;
    }
  }
}

const output = { pages, messagePages, navigation, cta };

const outPath = join(__dirname, "sanity-export.json");
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
console.log(`\n✓ Written: ${outPath}`);
console.log(`  Pages: ${Object.keys(pages).join(", ") || "(none)"}`);
console.log(`  MessagePages: ${Object.keys(messagePages).join(", ") || "(none)"}`);
console.log(`  Navigation: ${navigation ? "OK" : "missing"}`);
console.log(`  CTA: ${cta ? "OK" : "missing"}`);
