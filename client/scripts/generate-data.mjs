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

const HOME_PAGE = {
  content: [
    {
      _key: "d968bb0441bb",
      _type: "heroSection",
      ctaBtns: [
        { label: "Apply Now", style: "primary", internalPage: { slug: "/en/admissions" } },
        { label: "Book a School Tour", style: "none", externalLink: "https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I'd%20like%20to%20book%20a%20school%20tour%20for%20my%20child." }
      ],
      description: "Krishnaveni School in Peerzadiguda offers affordable, English-medium education rooted in local values and life skills.",
      imageUrl: {
        desktop: "https://cdn.sanity.io/images/jzbduz09/production/dfc7e6918a11671c8b0af4dc92ec483993181ebc-1944x1296.jpg",
        mobile: "https://cdn.sanity.io/images/jzbduz09/production/9d59dc8a0666915240673a85403c8e5618e4ef26-982x1728.jpg"
      },
      subtitle: "Empowering Future-Ready Students with Strong Academics & Life Skills",
      title: "Affordable, Values Driven Education in Peerzadiguda"
    },
    {
      _key: "5d9ff123e715",
      _type: "featureCards",
      cards: [
        { color: "2951e0", description: "Telangana SSC-recognized. High teaching standards at an affordable fee.", icon: "indian-rupee", title: "Affordable Excellence" },
        { color: "7AADD9", description: "Kawiz App, WhatsApp updates, real-time monitoring.", icon: "heart-handshake", title: "Strong Parent–School Connection" },
        { color: "F92543", description: "25:1 ratio, guidance for slow learners.", icon: "user-round", title: "Personal Attention" },
        { color: "25DE32", description: "Activity-based learning, storytelling, digital tools.", icon: "shrub", title: "Values + Modern Methods" }
      ],
      title: "Why Choose Krishnaveni?"
    },
    {
      _key: "86608f601875",
      _type: "introduction",
      ctaBtns: [
        { label: "Learn More", style: "primary", internalPage: { slug: "/en/about" } },
        { label: "Apply Now", style: "none", internalPage: { slug: "/en/admissions" } },
        { label: "Contact Us", style: "none", internalPage: { slug: "/en/contact" } }
      ],
      description: "Krishnaveni School is a trusted choice among Peerzadiguda education institutions, offering affordable, values-based learning for children from Nursery to 10th Class. With a strong focus on both academics and life skills, our school blends modern teaching methods with local cultural roots to create a well-rounded educational experience for every child.",
      facts: [
        { description: "Nursery to 10th Class", icon: "graduation-cap", title: "Grades Offered" },
        { description: "Telangana SSC / CBSE ", icon: "school", title: "Board Affiliation" },
        { description: "Peerzadiguda – serving Uppal, Boduppal, Medipally", icon: "map-pin", title: "Location" },
        { description: "English (Primary), Telugu & Hindi (2nd/3rd languages)", icon: "languages", title: "Medium of Instruction" }
      ],
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/ff8fe8440d1863a65f913bd775bd34a88dd8de21-1296x864.png",
      title: "At a Glance"
    },
    {
      _key: "22761bedc0a8",
      _type: "bentoGallery",
      ctaBtns: [{ label: "View More", style: "primary", internalPage: { slug: "/en/campus-life" } }],
      imageUrl: [
        { desktopImage: "https://cdn.sanity.io/images/jzbduz09/production/9e7b329421e0056883e25f3eaecb17cbfd093717-684x456.jpg", label: "Our Events", mobileImage: "https://cdn.sanity.io/images/jzbduz09/production/9e7b329421e0056883e25f3eaecb17cbfd093717-684x456.jpg" },
        { desktopImage: "https://cdn.sanity.io/images/jzbduz09/production/a5c450f591ab829be0b1937ce50230720f9883d8-1134x1911.jpg", label: "Our Transport Facilities", mobileImage: "https://cdn.sanity.io/images/jzbduz09/production/92a0997c93b19d7be075711ef2a1a94e8d9dcd65-567x956.jpg" },
        { desktopImage: "https://cdn.sanity.io/images/jzbduz09/production/1ddc427bf3123be354607e1d93a2b4d2015c0aca-1680x1120.jpg", label: "Our Activities", mobileImage: "https://cdn.sanity.io/images/jzbduz09/production/2a00171dc41291d453add674d2eee3cebd5c3b10-461x836.jpg" },
        { desktopImage: "https://cdn.sanity.io/images/jzbduz09/production/61b8eb8ce04daa82e80d19752ccdac4b5cdb89bf-840x560.jpg", label: "Our Classrooms", mobileImage: "https://cdn.sanity.io/images/jzbduz09/production/61b8eb8ce04daa82e80d19752ccdac4b5cdb89bf-840x560.jpg" }
      ],
      title: "Explore Our Campus Life"
    },
    {
      _key: "02621ce4e321",
      _type: "testimonials",
      testimonials: [
        { author: "Sharon Pappala", authorTitle: "Student", thumbnail: "https://cdn.sanity.io/images/jzbduz09/production/2e40a5098d5c8b1f0ff5acee705601de6867a416-609x874.png", video: "https://cdn.sanity.io/files/jzbduz09/production/aa81364686076dd09d45c3151c46a3818cab4990.mp4" },
        { author: "Abinya", authorTitle: "Student", thumbnail: "https://cdn.sanity.io/images/jzbduz09/production/49cfc84f46533bf877ff007f22932a7a90ca86fd-607x674.png", video: "https://cdn.sanity.io/files/jzbduz09/production/cbf44912408097afb82cd744a5a7e6838ebc7108.mp4" },
        { author: "Priya Jha", authorTitle: "Teacher", thumbnail: "https://cdn.sanity.io/images/jzbduz09/production/3e2b987b15cd1edfd47be527997a6ffc47e71e4f-604x688.png", video: "https://cdn.sanity.io/files/jzbduz09/production/a159e0164e8bcabedafd589b7a8dd95c05f9aca5.mp4" },
        { author: "Yamuna", authorTitle: "Parent", thumbnail: "https://cdn.sanity.io/images/jzbduz09/production/890f7ff4aa2e0deafe63cf6387d6f5bfecba3fa8-607x761.png", video: "https://cdn.sanity.io/files/jzbduz09/production/195a82cb28c8e3cb392a69d412d52c121df05f10.mp4" }
      ],
      title: "Why Choose Us?"
    }
  ],
  seo: {
    metaTitle: "Affordable English Medium School in Peerzadiguda – Krishnaveni School",
    metaDescription: "Krishnaveni School offers affordable, values-based education in Peerzadiguda. Recognized by Telangana SSC Board. Small class sizes, activity-based learning, and strong parent communication.",
    metaKeywords: "affordable English medium school in Peerzadiguda, best school near Uppal or Boduppal, values-based school in Hyderabad, Telangana SSC school admissions, activity-based learning school",
  },
};

const ABOUT_PAGE = {
  content: [
    {
      _key: "7256177e525d",
      _type: "heroSection",
      ctaBtns: [
        { label: "Apply Now", style: "primary", internalPage: { slug: "/en/admissions" } },
        { label: "Book a School Tour", style: "none", externalLink: "https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I%E2%80%99d%20like%20to%20book%20a%20school%20tour%20for%20my%20child." }
      ],
      description: "Established in 2017, Krishnaveni School is a recognized Telangana SSC board school offering affordable education from Nursery to 10th Class for all families.",
      imageUrl: {
        desktop: "https://cdn.sanity.io/images/jzbduz09/production/05f745aaf696ed75e192341f84da7c027eb5aa4d-1680x1120.jpg",
        mobile: "https://cdn.sanity.io/images/jzbduz09/production/960c9f6115c323d593f04ae389bd07ea91770cbf-637x896.jpg"
      },
      subtitle: "Best school for values and academics in Hyderabad",
      title: "About Krishnaveni School"
    },
    {
      _key: "30d3aeaf5c87",
      _type: "visionMission",
      mission: { content: "To empower every child through a joyful, practical, and disciplined learning environment, rooted in academic fundamentals, life skills, and personal values.", title: "Mission" },
      title: "Our Vision & Mission",
      vision: { content: "To provide affordable, values-driven, and quality education tailored to lower and middle-income families, nurturing confident, responsible, and future-ready students.", title: "Vision" }
    },
    {
      _key: "2fcef69f4451",
      _type: "twoColLayout",
      content: [
        { _key: "600e5125749c", _type: "block", children: [{ _key: "9bdc6183f80d", _type: "span", marks: [], text: "Every student has a story waiting to unfold—our job is just to give them the pen." }], markDefs: [], style: "normal" },
        { _key: "c1b1a287fe2b", _type: "block", children: [{ _key: "c831e308f3ab", _type: "span", marks: [], text: "" }], markDefs: [], style: "normal" },
        { _key: "9a918405bc63", _type: "block", children: [{ _key: "53f227762d3b", _type: "span", marks: ["em"], text: "- V. Kavitha (Principal)" }], markDefs: [], style: "normal" }
      ],
      imageFit: "contain",
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/9a0e87f56b6d19dde3f0b6f71dc08c0faeb03bf8-723x690.png",
      reverse: false,
      title: "Message from our Principal"
    },
    {
      _key: "c2d4b9a7c641",
      _type: "twoColLayout",
      content: [
        { _key: "d7b08562d3fb", _type: "block", children: [{ _key: "3bd80eaaa2b8", _type: "span", marks: [], text: "Our job is not to prepare students for something. Our job is to help students prepare themselves for anything." }], markDefs: [], style: "normal" },
        { _key: "3d1a0788aea0", _type: "block", children: [{ _key: "e117876db579", _type: "span", marks: [], text: "" }], markDefs: [], style: "normal" },
        { _key: "8816321b0f99", _type: "block", children: [{ _key: "10fb6bfb9257", _type: "span", marks: ["em"], text: "- P. V. Rajendra Prasad (Chairman)" }], markDefs: [], style: "normal" }
      ],
      imageFit: "contain",
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/2a7605ef91e9e9c33fedb877e7f423dfe9d94eec-780x764.png",
      reverse: true,
      title: "Message from our Chairman"
    },
    {
      _key: "425d9b848744",
      _type: "twoColLayout",
      content: [
        { _key: "5e9de9e0964a", _type: "block", children: [{ _key: "1c1c0e68e3a6", _type: "span", marks: [], text: "Krishnaveni School, a Peerzadiguda education institution, was founded in 2017 by committed educators. Today, we serve students from Uppal, Boduppal, and beyond — combining local values with modern teaching for confident learners." }], markDefs: [], style: "normal" },
        { _key: "786db91403aa", _type: "block", children: [{ _key: "b81fd57edf7f", _type: "span", marks: [], text: "\"We combine local cultural values with modern teaching to prepare students for a future of confidence and integrity.\"" }], markDefs: [], style: "blockquote" }
      ],
      imageFit: null,
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/410d1cb28c957b81db5179e93ad93177750a484e-1344x896.jpg",
      reverse: false,
      title: "Our Journey Since 2017"
    },
    {
      _key: "b5aa9f19f7a9",
      _type: "uniqueCards",
      cards: [
        { color: "2951e0", description: "Telangana SSC-recognized. High teaching standards at an affordable fee.", icon: "indian-rupee", title: "Affordable Excellence" },
        { color: "7AADD9", description: "Kawiz App, WhatsApp updates, real-time monitoring, and regular PTMs.", icon: "heart-handshake", title: "Strong Parent–School Connection" },
        { color: "F92543", description: "25:1 ratio, guidance for slow learners.", icon: "user-round", title: "Personal Attention" },
        { color: "25DE32", description: "Activity-based learning, storytelling, digital tools.", icon: "shrub", title: "Values + Modern Methods" }
      ],
      title: "What Sets Us Apart"
    },
    {
      _key: "e6de3881083a",
      _type: "centerLayout",
      content: [
        { _key: "f60703465b45", _type: "block", children: [{ _key: "ffeb554a8a1f", _type: "span", marks: [], text: "Krishnaveni School is recognized by the Telangana State Education Department and follows the Telangana SSC Board curriculum." }], markDefs: [], style: "normal" },
        { _key: "b0281bef0f58", _type: "block", children: [{ _key: "08560fcf6d15", _type: "span", marks: ["em"], text: "We are currently preparing to integrate CBSE-based learning for enhanced academic outcomes." }], markDefs: [], style: "normal" }
      ],
      title: "Our Recognition"
    }
  ],
  seo: {
    metaTitle: "About Krishnaveni School – Best School for Values & Academics in Hyderabad",
    metaDescription: "Learn about Krishnaveni School, a recognized Telangana SSC board school in Peerzadiguda offering low-cost, values-based education led by passionate founders and educators.",
    metaKeywords: "best school for values and academics in Hyderabad, low-cost school with quality education, Telangana SSC board school, Peerzadiguda education institutions",
  },
};

const ADMISSION_PAGE = {
  content: [
    {
      _key: "907529e97004",
      _type: "heroSection",
      ctaBtns: [],
      description: "Admissions are open for Nursery to Class 8 with expansion to Class 10 underway — enroll early to reserve your seat!",
      imageUrl: {
        desktop: "https://cdn.sanity.io/images/jzbduz09/production/c251db31dbbb7ad8868f6c6c4c06fbc9afaa4833-1296x864.jpg",
        mobile: "https://cdn.sanity.io/images/jzbduz09/production/bc6306a0879e1eabff22bf25f8bec24f053bfce6-428x691.jpg",
      },
      subtitle: "Looking for a school that blends academic excellence, local values, and affordability?",
      title: "Why Choose Krishnaveni?",
    },
    {
      _key: "e6d0b8c98312",
      _type: "twoColLayout",
      content: [
        { _key: "6709bc12b291", _type: "block", children: [{ _key: "80f5ef514f2e", _type: "span", marks: [], text: "Our simple admission process involves a walk-in or phone inquiry, followed by a brief parent–child interaction with the Principal." }], markDefs: [], style: "normal" },
        { _key: "cc5a05af8ace", _type: "block", children: [{ _key: "0ccc1f368b58", _type: "span", marks: [], text: "Inquiry – Walk in or call us" }], level: 1, listItem: "number", markDefs: [], style: "normal" },
        { _key: "e677582e46e6", _type: "block", children: [{ _key: "e759baaa5156", _type: "span", marks: [], text: "Registration – Fill the basic form" }], level: 1, listItem: "number", markDefs: [], style: "normal" },
        { _key: "0cc29ec131e1", _type: "block", children: [{ _key: "f975a36ea31e", _type: "span", marks: [], text: "Interaction – Meet with Principal or coordinator" }], level: 1, listItem: "number", markDefs: [], style: "normal" },
        { _key: "90b2b3a2ecda", _type: "block", children: [{ _key: "7b80a588cb08", _type: "span", marks: ["strong"], text: "Confirmation" }, { _key: "0e9e20babbb0", _type: "span", marks: [], text: " – Submit documents, confirm admission" }], level: 1, listItem: "number", markDefs: [], style: "normal" },
        { _key: "e02d1552cdf0", _type: "block", children: [{ _key: "79329d10d258", _type: "span", marks: ["em"], text: "No entrance test for Nursery to Class 1 – admission is on first-come, first-served basis." }], markDefs: [], style: "normal" },
      ],
      imageFit: null,
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/2b30fa781fd01af6b8dfe7336e29ac75d31b650f-768x768.png",
      reverse: false,
      title: "How to Apply",
    },
    {
      _key: "58fd01fbd84b",
      _type: "centerLayout",
      content: [
        { _key: "9ae764bc5f9e", _type: "block", children: [{ _key: "760e5ae1b405", _type: "span", marks: [], text: "Children aged 2.5 years and above can join Nursery without formal tests." }], markDefs: [], style: "normal" },
        { _key: "1b51b3df2fe5", _type: "table", rows: [
          { _key: "a1", _type: "tableRow", cells: ["Grade", "Age Requirement"] },
          { _key: "a2", _type: "tableRow", cells: ["Nursery", "2.5+ years"] },
          { _key: "a3", _type: "tableRow", cells: ["LKG", "3.5+ years"] },
          { _key: "a4", _type: "tableRow", cells: ["UKG", "4.5+ years"] },
          { _key: "a5", _type: "tableRow", cells: ["Class 1", "5.5+ years"] },
        ]},
      ],
      title: "Eligibility by Age",
    },
    {
      _key: "bad04485f94f",
      _type: "twoColLayout",
      content: [
        { _key: "d1f93204c529", _type: "block", children: [{ _key: "e7cb060f06c7", _type: "span", marks: [], text: "Child's Birth Certificate" }], level: 1, listItem: "bullet", markDefs: [], style: "normal" },
        { _key: "0d28382a5657", _type: "block", children: [{ _key: "b46285bf5b74", _type: "span", marks: [], text: "Aadhaar Card (Parent & Child)" }], level: 1, listItem: "bullet", markDefs: [], style: "normal" },
        { _key: "98697fe87100", _type: "block", children: [{ _key: "9e4d4b407541", _type: "span", marks: [], text: "2 Passport Photos (each)" }], level: 1, listItem: "bullet", markDefs: [], style: "normal" },
        { _key: "bc666694827d", _type: "block", children: [{ _key: "a11b9e37293d", _type: "span", marks: [], text: "Transfer Certificate (if applicable)" }], level: 1, listItem: "bullet", markDefs: [], style: "normal" },
      ],
      imageFit: null,
      imageUrl: "https://cdn.sanity.io/images/jzbduz09/production/21485e47a9637f89dfc596ece31d52da6d279a16-768x768.png",
      reverse: true,
      title: "What to Bring?",
    },
    {
      _key: "5d53ec78fe5a",
      _type: "centerLayout",
      content: [{ _key: "58a68a86029a", _type: "block", children: [{ _key: "ada11e758a29", _type: "span", marks: [], text: "We share fee details directly during the campus visit or with enrolled parents. We do not publish fee tables online to ensure fairness and protect family privacy." }], markDefs: [], style: "normal" }],
      title: "Fees & Transparency",
    },
    {
      _key: "7471ba2a8adc",
      _type: "centerLayout",
      content: [{ _key: "5d3c34b86cad", _type: "block", children: [{ _key: "1f16a4a113dc", _type: "span", marks: [], text: "We're preparing to offer merit-based waivers to high-performing and low-income students starting next academic cycle." }], markDefs: [], style: "normal" }],
      title: "Scholarship Options",
    },
    {
      _key: "7cbd6e50739d",
      _type: "faq",
      faqs: [
        { answer: "Yes, if seats are available.", question: "Do you accept mid-year admissions?" },
        { answer: "English, with Telugu and Hindi as second/third languages.", question: "What's the medium of instruction?" },
        { answer: "Yes, we run buses to Uppal and Boduppal.", question: "Is transport available?" },
      ],
      title: "Common Questions",
    },
  ],
  seo: {
    metaTitle: "Admissions – English Medium School in Peerzadiguda | Krishnaveni School",
    metaDescription: "Learn how to apply to Krishnaveni School in Peerzadiguda. English medium nursery admissions, no entrance test, simple process, and trusted SSC board affiliation.",
    metaKeywords: "how to apply to schools in Peerzadiguda, admission age for nursery in Hyderabad, school admission process Telangana",
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
    { label: "Achievements", link: { slug: "/en/achievements" } },
    { label: "Facilities", link: { slug: "/en/facilities" } },
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
  home: HOME_PAGE,
  about: ABOUT_PAGE,
  academics: buildPageData("academics", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  admission: ADMISSION_PAGE,
  campusLife: buildPageData("campusLife", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  contact: buildPageData("contact", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
  parents: buildPageData("parents", { content: [], seo: { metaTitle: "", metaDescription: "" } }),
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
const CTA_FALLBACK = {
  title: "Ready to Learn More?",
  description: "Schedule a visit or speak to our admissions team today.",
  ctaBtns: [
    { label: "Apply Now", style: "primary", internalPage: { slug: "/en/admissions" } },
    { label: "Book a School Tour", style: "none", externalLink: "https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I'd%20like%20to%20book%20a%20school%20tour%20for%20my%20child." }
  ],
  imageUrl: {
    desktop: "https://cdn.sanity.io/images/jzbduz09/production/d90cf6a6a874201f68243125e7c45ced448a1ae1-1296x864.jpg",
    mobile: "https://cdn.sanity.io/images/jzbduz09/production/bba7c6165e83a2cef2d6d3fab6c6130f0dca4b71-517x864.jpg",
  },
};

const cta = sanity.cta ? cleanCta(sanity.cta) : CTA_FALLBACK;

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
