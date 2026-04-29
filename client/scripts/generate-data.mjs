/**
 * generate-data.mjs
 * Reads sanity-export.json and writes lib/data/index.ts with all static page data.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientDir = resolve(__dirname, "..");

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    console.warn(`⚠ Could not load ${path}`);
    return null;
  }
}

const sanity = loadJson(join(__dirname, "sanity-export.json"));

if (!sanity) {
  console.error("sanity-export.json not found — run fetch-sanity.mjs first");
  process.exit(1);
}

// ── Fallback data ─────────────────────────────────────────────────────────────

const ACHIEVEMENTS_PAGE = {
  content: [
    {
      _key: "achievements-hero",
      _type: "heroSection",
      title: "Achievements",
      subtitle: "Our Honours & Recognitions",
      description: "Krishnaveni School is proud of the remarkable achievements of our students and staff.",
      imageUrl: {
        desktop: "https://cdn.sanity.io/images/jzbduz09/production/05f745aaf696ed75e192341f84da7c027eb5aa4d-1680x1120.jpg",
        mobile: "https://cdn.sanity.io/images/jzbduz09/production/960c9f6115c323d593f04ae389bd07ea91770cbf-637x896.jpg",
      },
      ctaBtns: [],
    },
    {
      _key: "achievements-cards",
      _type: "featureCards",
      title: "Our Awards & Recognitions",
      cards: [
        { title: "Karate Awards", description: "Our students have excelled in national-level karate competitions, bringing pride to the school.", icon: "medal", color: "#E8B84B" },
        { title: "Gold Medals", description: "Consistently securing gold medals in academic and sports events at regional and state levels.", icon: "trophy", color: "#F5A623" },
        { title: "Limca Book of Records", description: "Recognised in the Limca Book of Records for outstanding collective achievements.", icon: "book-open", color: "#4A90D9" },
        { title: "Eco Clubs", description: "Active participation in environmental initiatives and eco-club activities.", icon: "leaf", color: "#27AE60" },
        { title: "TATA Certifications", description: "Students and staff have earned certifications under TATA-backed educational programs.", icon: "award", color: "#2951E0" },
      ],
    },
  ],
  seo: {
    metaTitle: "Achievements – Krishnaveni School",
    metaDescription: "Explore the achievements of Krishnaveni School — karate awards, gold medals, Limca Book of Records recognition, eco clubs, and TATA certifications.",
    metaKeywords: "Krishnaveni School achievements, karate awards, gold medals, Limca Book of Records, eco clubs, TATA certifications",
  },
};

const FACILITIES_PAGE = {
  content: [
    {
      _key: "facilities-hero",
      _type: "heroSection",
      title: "Our Facilities",
      subtitle: "Everything Your Child Needs to Thrive",
      description: "We provide a rich learning environment with modern infrastructure and diverse academic programs.",
      imageUrl: {
        desktop: "https://cdn.sanity.io/images/jzbduz09/production/05f745aaf696ed75e192341f84da7c027eb5aa4d-1680x1120.jpg",
        mobile: "https://cdn.sanity.io/images/jzbduz09/production/960c9f6115c323d593f04ae389bd07ea91770cbf-637x896.jpg",
      },
      ctaBtns: [],
    },
    {
      _key: "facilities-showcase",
      _type: "facilitiesShowcase",
      cards: [
        { title: "Playroom", description: "Dedicated playroom for early learners with age-appropriate activities.", icon: "gamepad-2", color: "#E74C3C" },
        { title: "Playground", description: "Spacious outdoor playground for physical activity and team sports.", icon: "trees", color: "#27AE60" },
        { title: "Library", description: "Well-stocked library encouraging a love for reading and research.", icon: "library", color: "#8E44AD" },
        { title: "Composite Lab", description: "Fully equipped science composite lab for hands-on experiments.", icon: "flask-conical", color: "#2980B9" },
        { title: "LED Projector & LCD TVs", description: "Smart classrooms with LED projectors and LCD TVs for interactive learning.", icon: "monitor", color: "#2C3E50" },
        { title: "Activity Room", description: "Dedicated space for arts, crafts, and extracurricular activities.", icon: "palette", color: "#E67E22" },
        { title: "Computer Lab", description: "Modern computer lab with high-speed internet access for digital learning.", icon: "monitor-check", color: "#16A085" },
        { title: "Separate Washrooms", description: "Clean, safe, and separate washroom facilities for boys and girls.", icon: "building-2", color: "#7F8C8D" },
        { title: "AI-Based Learning", description: "Cutting-edge AI-powered tools integrated into the curriculum.", icon: "cpu", color: "#2951E0" },
        { title: "Vedic Maths & IIT Foundation", description: "Strong foundation in mathematics through Vedic techniques and IIT prep.", icon: "calculator", color: "#F5A623" },
        { title: "Abacus", description: "Abacus training to sharpen mental arithmetic and concentration.", icon: "hash", color: "#E8B84B" },
        { title: "Coding & Robotics", description: "Hands-on coding and robotics classes for future-ready learners.", icon: "bot", color: "#1ABC9C" },
        { title: "Karate", description: "Structured karate training building discipline, fitness, and confidence.", icon: "shield", color: "#E74C3C" },
        { title: "Special Classes", description: "Remedial and advanced special classes tailored to individual learning needs.", icon: "graduation-cap", color: "#9B59B6" },
        { title: "Bus Transport", description: "Safe and reliable bus transport to and from nearby locations.", icon: "bus", color: "#2ECC71" },
      ],
    },
  ],
  seo: {
    metaTitle: "Facilities – Krishnaveni School",
    metaDescription: "Discover world-class facilities at Krishnaveni School — playroom, playground, library, composite lab, computer lab, AI learning, coding & robotics, and more.",
    metaKeywords: "Krishnaveni School facilities, computer lab, AI learning, robotics, library, playground, bus transport",
  },
};

const NAVIGATION = {
  cta: { label: "Contact Us", link: { slug: "/en/contact" } },
  navLinks: [
    { label: "Home", link: { slug: "/en" } },
    { label: "About Us", link: { slug: "/en/about" } },
    { label: "Academics", link: { slug: "/en/academics" } },
    { label: "Campus Life", link: { slug: "/en/campus-life" } },
    { label: "Achievements", link: { slug: "/en/achievements" } },
    { label: "Facilities", link: { slug: "/en/facilities" } },
    { label: "For Parents", link: { slug: "/en/parents" } },
    { label: "Admissions", link: { slug: "/en/admissions" } },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractCenterLayoutContent(sanityPageKey) {
  const page = sanity.pages[sanityPageKey];
  if (!page?.content) return [];
  for (const s of page.content) {
    if (s._type === "centerLayout") return s.content ?? [];
  }
  return [];
}

function cleanSeo(seo) {
  if (!seo) return { metaTitle: "", metaDescription: "" };
  const { _type, ...rest } = seo;
  return rest;
}

function cleanCtaBtns(btns) {
  if (!Array.isArray(btns)) return [];
  return btns.map((btn) => ({
    label: btn.label ?? "",
    style: btn.style ?? "none",
    ...(btn.internalPage ? { internalPage: btn.internalPage } : {}),
    ...(btn.externalLink ? { externalLink: btn.externalLink } : {}),
  }));
}

function cleanSection(s) {
  if (!s) return s;
  const result = { ...s };
  delete result.images;
  if (result.ctaBtns !== undefined) {
    result.ctaBtns = cleanCtaBtns(result.ctaBtns);
  }
  return result;
}

function buildPageData(sanityPageKey, fallback) {
  const sp = sanity.pages[sanityPageKey];
  if (sp) {
    return {
      content: (sp.content ?? []).map(cleanSection),
      seo: cleanSeo(sp.seo),
    };
  }
  return fallback;
}

function cleanCta(cta) {
  if (!cta) return { title: "", description: "", ctaBtns: [], imageUrl: { desktop: "", mobile: "" } };
  return {
    title: cta.title ?? "",
    description: cta.description ?? "",
    ctaBtns: cleanCtaBtns(cta.ctaBtns),
    imageUrl: cta.imageUrl ?? { desktop: "", mobile: "" },
  };
}

// ── Build data ────────────────────────────────────────────────────────────────

const pages = {
  home: buildPageData("home", { content: [], seo: { metaTitle: "Krishnaveni School", metaDescription: "" } }),
  about: buildPageData("about", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  academics: buildPageData("academics", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  admission: buildPageData("admission", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  campusLife: buildPageData("campusLife", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  contact: buildPageData("contact", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  parents: buildPageData("parents", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  achievements: ACHIEVEMENTS_PAGE,
  facilities: FACILITIES_PAGE,
};

const messagePages = {
  principalMessage: {
    name: "V. Kavitha",
    designation: "Principal",
    imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/9a0e87f56b6d19dde3f0b6f71dc08c0faeb03bf8-723x690.png",
    content: extractCenterLayoutContent("principal-message"),
    seo: cleanSeo(sanity.pages["principal-message"]?.seo),
  },
  chairmanMessage: {
    name: "P. V. Rajendra Prasad",
    designation: "Chairman",
    imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/2a7605ef91e9e9c33fedb877e7f423dfe9d94eec-780x764.png",
    content: extractCenterLayoutContent("chairman-message"),
    seo: cleanSeo(sanity.pages["chairman-message"]?.seo),
  },
};

const navigation = NAVIGATION;
const cta = cleanCta(sanity.cta);

// ── Serialize as TypeScript ───────────────────────────────────────────────────

function ser(val) {
  return JSON.stringify(val, null, 2);
}

const ts = `// AUTO-GENERATED by scripts/generate-data.mjs — do not edit by hand
// Re-run: node scripts/generate-data.mjs

import type { HomepageData, MessagePageData, NavigationProps, CTAProps } from "@/lib/types";

export const pageData: Record<string, Record<string, HomepageData>> = {
  en: {
${Object.entries(pages).map(([k, v]) => `    ${k}: ${ser(v)} as unknown as HomepageData,`).join("\n")}
  },
};

export const messageData: Record<string, Record<string, MessagePageData>> = {
  en: {
${Object.entries(messagePages).map(([k, v]) => `    ${k}: ${ser(v)} as unknown as MessagePageData,`).join("\n")}
  },
};

export const navigationData: Record<string, NavigationProps> = {
  en: ${ser(navigation)} as unknown as NavigationProps,
};

export const ctaData: Record<string, CTAProps> = {
  en: ${ser(cta)} as unknown as CTAProps,
};
`;

const outDir = join(clientDir, "lib", "data");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "index.ts");
writeFileSync(outPath, ts, "utf-8");

console.log(`✓ Written: lib/data/index.ts (EN only)`);
console.log(`  Pages: ${Object.keys(pages).join(", ")}`);
console.log(`  MessagePages: ${Object.keys(messagePages).join(", ")}`);
