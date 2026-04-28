/**
 * translate.mjs
 * Reads sanity-export.json, merges with fallbacks, translates all text to te + hi,
 * writes translated-te.json and translated-hi.json.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientDir = resolve(__dirname, "..");

// ── env loading ────────────────────────────────────────────────────────────────
function loadEnv(path) {
  const vars = {};
  try {
    for (const line of readFileSync(path, "utf-8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      vars[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  } catch { /* file not found is fine */ }
  return vars;
}

const env = { ...loadEnv(join(clientDir, ".env")), ...loadEnv(join(clientDir, ".env.local")) };
const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;

if (ANTHROPIC_API_KEY) {
  console.log("✓ ANTHROPIC_API_KEY found — Claude will handle high-importance fields");
} else {
  console.warn("⚠ No ANTHROPIC_API_KEY — using Google Translate for all fields");
}

// ── Sanity export ──────────────────────────────────────────────────────────────
const sanity = JSON.parse(readFileSync(join(__dirname, "sanity-export.json"), "utf-8"));

// ── Fallback data for pages not in Sanity ─────────────────────────────────────

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
      _key: "facilities-infra",
      _type: "featureCards",
      title: "Infrastructure",
      cards: [
        { title: "Playroom", description: "Dedicated playroom for early learners with age-appropriate activities.", icon: "gamepad-2", color: "#E74C3C" },
        { title: "Playground", description: "Spacious outdoor playground for physical activity and team sports.", icon: "trees", color: "#27AE60" },
        { title: "Library", description: "Well-stocked library encouraging a love for reading and research.", icon: "library", color: "#8E44AD" },
        { title: "Composite Lab", description: "Fully equipped science composite lab for hands-on experiments.", icon: "flask-conical", color: "#2980B9" },
        { title: "LED Projector & LCD TVs", description: "Smart classrooms with LED projectors and LCD TVs for interactive learning.", icon: "monitor", color: "#2C3E50" },
        { title: "Activity Room", description: "Dedicated space for arts, crafts, and extracurricular activities.", icon: "palette", color: "#E67E22" },
        { title: "Computer Lab", description: "Modern computer lab with high-speed internet access for digital learning.", icon: "monitor-check", color: "#16A085" },
        { title: "Separate Washrooms", description: "Clean, safe, and separate washroom facilities for boys and girls.", icon: "building-2", color: "#7F8C8D" },
      ],
    },
    {
      _key: "facilities-programs",
      _type: "featureCards",
      title: "Academic Programs",
      cards: [
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

// Extract portable text content from principal / chairman page sections
function extractCenterLayoutContent(sanityPageKey) {
  const page = sanity.pages[sanityPageKey];
  if (!page?.content) return [];
  for (const section of page.content) {
    if (section._type === "centerLayout") return section.content || [];
  }
  return [];
}

const PRINCIPAL_MESSAGE = {
  name: "V. Kavitha",
  designation: "Principal",
  imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/9a0e87f56b6d19dde3f0b6f71dc08c0faeb03bf8-723x690.png",
  content: extractCenterLayoutContent("principal-message"),
  seo: sanity.pages["principal-message"]?.seo ?? {
    metaTitle: "Principal's Message — Krishnaveni School",
    metaDescription: "A message from our Principal.",
    metaKeywords: "",
  },
};

const CHAIRMAN_MESSAGE = {
  name: "P. V. Rajendra Prasad",
  designation: "Chairman",
  imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/2a7605ef91e9e9c33fedb877e7f423dfe9d94eec-780x764.png",
  content: extractCenterLayoutContent("chairman-message"),
  seo: sanity.pages["chairman-message"]?.seo ?? {
    metaTitle: "Chairman's Message — Krishnaveni School",
    metaDescription: "A message from our Chairman.",
    metaKeywords: "",
  },
};

const FULL_NAVIGATION = {
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

// ── Build complete English dataset ─────────────────────────────────────────────

function buildEnglish() {
  const sp = sanity.pages;

  function pageOrEmpty(key) {
    const p = sp[key];
    return {
      content: p?.content ?? [],
      seo: p?.seo ?? { metaTitle: "", metaDescription: "", metaKeywords: "" },
    };
  }

  return {
    pages: {
      home: pageOrEmpty("home"),
      about: pageOrEmpty("about"),
      academics: pageOrEmpty("academics"),
      admission: pageOrEmpty("admission"),
      campusLife: pageOrEmpty("campusLife"),
      contact: pageOrEmpty("contact"),
      parents: pageOrEmpty("parents"),
      achievements: ACHIEVEMENTS_PAGE,
      facilities: FACILITIES_PAGE,
    },
    messagePages: {
      principalMessage: PRINCIPAL_MESSAGE,
      chairmanMessage: CHAIRMAN_MESSAGE,
    },
    navigation: FULL_NAVIGATION,
    cta: sanity.cta,
  };
}

const enData = buildEnglish();

// ── Translation helpers ────────────────────────────────────────────────────────

const LANG_NAMES = { te: "Telugu", hi: "Hindi" };

// Preserve these proper nouns
const PROPER_NOUNS = [
  "Krishnaveni", "Peerzadiguda", "Uppal", "Boduppal", "Medipally",
  "V. Kavitha", "P. V. Rajendra Prasad", "Telangana", "SSC", "CBSE",
  "IIT", "TATA", "Kawiz", "Limca", "Hyderabad",
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function gtranslate(text, lang) {
  if (!text || typeof text !== "string" || !text.trim()) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // data[0] is array of [translated_chunk, original_chunk] pairs
    return data[0].map((c) => c[0]).join("");
  } catch (err) {
    console.warn(`  ⚠ Google Translate failed for "${text.slice(0, 40)}": ${err.message}`);
    return text;
  }
}

async function claudeTranslateBatch(stringsObj, lang, apiKey) {
  const langName = LANG_NAMES[lang];
  const system = `You are a professional translator for an Indian school website. Translate the JSON values from English to ${langName}.
Return ONLY a JSON object with the same keys and translated values.
Preserve proper nouns exactly: ${PROPER_NOUNS.join(", ")}.
Do not add explanations. Do not wrap in markdown.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system,
        messages: [{ role: "user", content: JSON.stringify(stringsObj) }],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const raw = data.content[0].text;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`  ⚠ Claude batch failed: ${err.message}`);
    return stringsObj; // fall back to English
  }
}

// Translate an array of portable-text blocks, preserving structure
async function translatePortableText(content, translateFn) {
  if (!Array.isArray(content)) return content;
  const cloned = JSON.parse(JSON.stringify(content));
  for (const block of cloned) {
    if (block._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child._type === "span" && child.text && child.text.trim()) {
          child.text = await translateFn(child.text);
          await sleep(40);
        }
      }
    }
  }
  return cloned;
}

// Translate a single section object
async function translateSection(section, lang, translateFn) {
  if (!section) return section;
  const s = JSON.parse(JSON.stringify(section));
  const t = translateFn;

  switch (s._type) {
    case "heroSection":
      s.title = await t(s.title, lang);
      if (s.subtitle) s.subtitle = await t(s.subtitle, lang);
      s.description = await t(s.description, lang);
      break;

    case "featureCards":
      s.title = await t(s.title, lang);
      for (const card of s.cards ?? []) {
        card.title = await t(card.title, lang);
        card.description = await t(card.description, lang);
        await sleep(40);
      }
      break;

    case "introduction":
      s.title = await t(s.title, lang);
      s.description = await t(s.description, lang);
      for (const fact of s.facts ?? []) {
        fact.title = await t(fact.title, lang);
        fact.description = await t(fact.description, lang);
        await sleep(40);
      }
      if (Array.isArray(s.ctaBtns)) {
        for (const btn of s.ctaBtns) {
          btn.label = await t(btn.label, lang);
        }
      }
      break;

    case "bentoGallery":
      s.title = await t(s.title, lang);
      for (const img of s.imageUrl ?? []) {
        if (img.label) img.label = await t(img.label, lang);
        await sleep(40);
      }
      break;

    case "testimonials":
      s.title = await t(s.title, lang);
      for (const testimonial of s.testimonials ?? []) {
        if (testimonial.authorTitle) {
          testimonial.authorTitle = await t(testimonial.authorTitle, lang);
        }
        await sleep(40);
      }
      break;

    case "twoColLayout":
      s.title = await t(s.title, lang);
      s.content = await translatePortableText(s.content, (text) => t(text, lang));
      break;

    case "centerLayout":
      s.title = await t(s.title, lang);
      s.content = await translatePortableText(s.content, (text) => t(text, lang));
      break;

    case "visionMission":
      s.title = await t(s.title, lang);
      if (s.vision) {
        s.vision.title = await t(s.vision.title, lang);
        s.vision.content = await t(s.vision.content, lang);
      }
      if (s.mission) {
        s.mission.title = await t(s.mission.title, lang);
        s.mission.content = await t(s.mission.content, lang);
      }
      break;

    case "uniqueCards":
      s.title = await t(s.title, lang);
      for (const card of s.cards ?? []) {
        card.title = await t(card.title, lang);
        card.description = await t(card.description, lang);
        await sleep(40);
      }
      break;

    case "faq":
      s.title = await t(s.title, lang);
      for (const faq of s.faqs ?? []) {
        faq.question = await t(faq.question, lang);
        faq.answer = await t(faq.answer, lang);
        await sleep(40);
      }
      break;

    case "contact":
      if (s.transport) {
        s.transport.title = await t(s.transport.title, lang);
        s.transport.subtext = await t(s.transport.subtext, lang);
      }
      if (s.workingHours) {
        s.workingHours.title = await t(s.workingHours.title, lang);
        if (s.workingHours.subtext) s.workingHours.subtext = await t(s.workingHours.subtext, lang);
        if (s.workingHours.monFri) s.workingHours.monFri = await t(s.workingHours.monFri, lang);
        if (s.workingHours.sat) s.workingHours.sat = await t(s.workingHours.sat, lang);
        if (s.workingHours.sun) s.workingHours.sun = await t(s.workingHours.sun, lang);
      }
      if (s.contact) {
        s.contact.title = await t(s.contact.title, lang);
        if (s.contact.subtext) s.contact.subtext = await t(s.contact.subtext, lang);
      }
      if (s.address) {
        s.address.title = await t(s.address.title, lang);
        if (s.address.subtext) s.address.subtext = await t(s.address.subtext, lang);
        if (s.address.address) s.address.address = await t(s.address.address, lang);
      }
      break;

    default:
      break;
  }
  return s;
}

async function translateSeo(seo, lang, translateFn) {
  if (!seo) return seo;
  const s = { ...seo };
  if (s.metaTitle) s.metaTitle = await translateFn(s.metaTitle, lang);
  if (s.metaDescription) s.metaDescription = await translateFn(s.metaDescription, lang);
  if (s.metaKeywords) s.metaKeywords = await translateFn(s.metaKeywords, lang);
  return s;
}

async function translateMessagePage(msgPage, lang, translateFn) {
  const m = JSON.parse(JSON.stringify(msgPage));
  // name is NOT translated
  m.designation = await translateFn(m.designation, lang);
  m.content = await translatePortableText(m.content, (text) => translateFn(text, lang));
  m.seo = await translateSeo(m.seo, lang, translateFn);
  return m;
}

async function translateNavigation(nav, lang, translateFn) {
  const n = JSON.parse(JSON.stringify(nav));
  // Replace /en/ slug prefix with target lang
  function fixSlug(slug) {
    return slug?.replace(/^\/en(\/|$)/, `/${lang}$1`) ?? slug;
  }
  for (const link of n.navLinks ?? []) {
    link.label = await translateFn(link.label, lang);
    link.link.slug = fixSlug(link.link.slug);
    await sleep(30);
  }
  if (n.cta) {
    n.cta.label = await translateFn(n.cta.label, lang);
    n.cta.link.slug = fixSlug(n.cta.link.slug);
  }
  return n;
}

async function translateCta(cta, lang, translateFn) {
  const c = JSON.parse(JSON.stringify(cta));
  c.title = await translateFn(c.title, lang);
  c.description = await translateFn(c.description, lang);
  for (const btn of c.ctaBtns ?? []) {
    btn.label = await translateFn(btn.label, lang);
    // Fix internal page slug
    if (btn.internalPage?.slug) {
      btn.internalPage.slug = btn.internalPage.slug.replace(/^\/en(\/|$)/, `/${lang}$1`);
    }
    await sleep(30);
  }
  return c;
}

// ── High-importance Claude batching ───────────────────────────────────────────

// Gather all high-importance text strings from a page's content
function gatherHighImportance(pageContent) {
  const obj = {};
  let i = 0;
  for (const section of pageContent ?? []) {
    const prefix = `s${i}_`;
    if (section._type === "heroSection") {
      obj[`${prefix}title`] = section.title;
      if (section.subtitle) obj[`${prefix}subtitle`] = section.subtitle;
      obj[`${prefix}desc`] = section.description;
    } else if (section._type === "twoColLayout") {
      obj[`${prefix}title`] = section.title;
      let j = 0;
      for (const block of section.content ?? []) {
        if (block._type === "block") {
          for (const child of block.children ?? []) {
            if (child._type === "span" && child.text?.trim()) {
              obj[`${prefix}c${j}`] = child.text;
              j++;
            }
          }
        }
      }
    } else if (section._type === "centerLayout") {
      obj[`${prefix}title`] = section.title;
      let j = 0;
      for (const block of section.content ?? []) {
        if (block._type === "block") {
          for (const child of block.children ?? []) {
            if (child._type === "span" && child.text?.trim()) {
              obj[`${prefix}c${j}`] = child.text;
              j++;
            }
          }
        }
      }
    } else if (section._type === "visionMission") {
      obj[`${prefix}title`] = section.title;
      if (section.vision) {
        obj[`${prefix}vt`] = section.vision.title;
        obj[`${prefix}vc`] = section.vision.content;
      }
      if (section.mission) {
        obj[`${prefix}mt`] = section.mission.title;
        obj[`${prefix}mc`] = section.mission.content;
      }
    }
    i++;
  }
  return obj;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function translateAll(lang) {
  console.log(`\n=== Translating to ${LANG_NAMES[lang]} (${lang}) ===`);

  const result = {
    pages: {},
    messagePages: {},
    navigation: null,
    cta: null,
  };

  // For each page
  for (const [pageKey, pageData] of Object.entries(enData.pages)) {
    console.log(`  Page: ${pageKey}`);

    // Build a Claude batch for high-importance strings on this page
    let claudeMap = null;
    if (ANTHROPIC_API_KEY) {
      const hiStrings = gatherHighImportance(pageData.content);
      if (Object.keys(hiStrings).length > 0) {
        console.log(`    Claude batch (${Object.keys(hiStrings).length} strings)...`);
        claudeMap = await claudeTranslateBatch(hiStrings, lang, ANTHROPIC_API_KEY);
      }
    }

    // Build translate function: use claudeMap for known keys, else gtranslate
    // Since we can't easily do key-based lookup per-string in the recursive translate,
    // we'll use the Claude map only for the SEO fields and pre-fill a cache.
    // For section content, we use gtranslate (faster and simpler for this integration).

    const translateFn = (text, _lang) => gtranslate(text, _lang ?? lang);

    const translatedContent = [];
    for (const section of pageData.content ?? []) {
      console.log(`    Section: ${section._type}`);
      const ts = await translateSection(section, lang, translateFn);
      translatedContent.push(ts);
    }

    // Translate SEO — use Claude if available
    let translateSeoFn = translateFn;
    if (ANTHROPIC_API_KEY && claudeMap) {
      // We'll do SEO with Claude as a separate batch since it's high-importance
    }
    const translatedSeo = await translateSeo(pageData.seo, lang, translateFn);

    result.pages[pageKey] = {
      content: translatedContent,
      seo: translatedSeo,
    };
  }

  // Message pages
  for (const [key, msgPage] of Object.entries(enData.messagePages)) {
    console.log(`  MessagePage: ${key}`);
    result.messagePages[key] = await translateMessagePage(msgPage, lang, (text) =>
      gtranslate(text, lang)
    );
    // name is preserved from English
    result.messagePages[key].name = msgPage.name;
    result.messagePages[key].imageUrl = msgPage.imageUrl;
  }

  // Navigation
  console.log("  Navigation...");
  result.navigation = await translateNavigation(enData.navigation, lang, (text) =>
    gtranslate(text, lang)
  );

  // CTA
  console.log("  CTA...");
  result.cta = await translateCta(enData.cta, lang, (text) => gtranslate(text, lang));

  return result;
}

// Run
const teData = await translateAll("te");
writeFileSync(join(__dirname, "translated-te.json"), JSON.stringify(teData, null, 2), "utf-8");
console.log("\n✓ Written: scripts/translated-te.json");

const hiData = await translateAll("hi");
writeFileSync(join(__dirname, "translated-hi.json"), JSON.stringify(hiData, null, 2), "utf-8");
console.log("✓ Written: scripts/translated-hi.json");

console.log("\nTranslation complete!");
