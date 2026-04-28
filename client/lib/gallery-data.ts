export type GalleryItem = {
	url: string;
	type: "image" | "video";
	caption?: string;
};

export type GalleryCategory = {
	id: string;
	title: string;
	description: string;
	year: string;
	emoji: string;
	items: GalleryItem[];
};

function img(folder: string, file: string, caption?: string): GalleryItem {
	return {
		url: `/upgrade/${folder}/${encodeURIComponent(file)}`,
		type: "image",
		caption,
	};
}

function vid(folder: string, file: string, caption?: string): GalleryItem {
	return {
		url: `/upgrade/${folder}/${encodeURIComponent(file)}`,
		type: "video",
		caption,
	};
}

function imgRoot(file: string, caption?: string): GalleryItem {
	return {
		url: `/upgrade/${encodeURIComponent(file)}`,
		type: "image",
		caption,
	};
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
	{
		id: "karate",
		title: "Karate",
		description:
			"M. Saanvi and P. Devisree (5th Class) achieved recognition in the Limca Book of Records. Other students also earned Karate certifications, showcasing discipline and dedication.",
		year: "2025",
		emoji: "🥋",
		items: [
			img("karate", "WhatsApp Image 2026-04-22 at 12.42.41 (2).jpeg"),
			img("karate", "WhatsApp Image 2026-04-22 at 12.42.42.jpeg"),
			img("karate", "WhatsApp Image 2026-04-22 at 12.42.44 (2).jpeg"),
			img("karate", "WhatsApp Image 2026-04-22 at 12.42.46.jpeg"),
			img("karate", "WhatsApp Image 2026-04-22 at 12.42.48 (1).jpeg"),
		],
	},
	{
		id: "limca-awards",
		title: "Limca Book of Records",
		description:
			"Recognition in the prestigious Limca Book of Records for outstanding achievements.",
		year: "2025",
		emoji: "🏆",
		items: [
			img("limca-awards", "WhatsApp Image 2026-04-22 at 12.42.46 (3).jpeg"),
		],
	},
	{
		id: "robotics",
		title: "Robotics Club",
		description:
			"Students secured certifications and medals in Robotics, demonstrating innovation, creativity, and technical skills.",
		year: "2025",
		emoji: "🤖",
		items: [
			img("robotics-club", "WhatsApp Image 2026-04-22 at 12.42.39 (2).jpeg"),
			img("robotics-club", "WhatsApp Image 2026-04-22 at 12.42.47 (1).jpeg"),
			img("robotics-club", "WhatsApp Image 2026-04-28 at 22.42.14.jpeg"),
			img("robotics-club", "WhatsApp Image 2026-04-28 at 22.42.26.jpeg"),
			img("robotics-club", "WhatsApp Image 2026-04-28 at 22.42.41.jpeg"),
		],
	},
	{
		id: "eco-club",
		title: "Eco Club",
		description:
			"Active involvement in National Green Corps (Eco Club) activities and receipt of Eco Club certificates.",
		year: "2025",
		emoji: "🌿",
		items: [
			img("eco-club", "WhatsApp Image 2026-04-22 at 12.42.47 (2).jpeg"),
			imgRoot("eco-club.jpeg"),
		],
	},
	{
		id: "certifications",
		title: "Certifications",
		description: "Student achievement certifications across various programs.",
		year: "2025",
		emoji: "📜",
		items: [
			img("certifications", "WhatsApp Image 2026-04-22 at 12.42.43 (1).jpeg"),
			img("certifications", "WhatsApp Image 2026-04-22 at 12.42.45 (2).jpeg"),
		],
	},
	{
		id: "tata",
		title: "Tata Building India",
		description:
			"Participation & recognition in programs conducted at Tata Group initiatives (Tata Building India activities).",
		year: "2025",
		emoji: "🏛️",
		items: [imgRoot("english-certificate-tata.jpeg")],
	},
	{
		id: "republic-day",
		title: "Republic Day",
		description:
			"Celebrating Republic Day with pride, patriotism, and enthusiasm.",
		year: "2025",
		emoji: "🇮🇳",
		items: [
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.29 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.29 (5).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.30 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.30 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.30 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.30.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.31 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.31 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.31 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.31.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.32 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.32.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.33 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.33 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.33 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.33.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.34 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.34 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.34 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.34.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.35 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.35 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.35 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.35.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.36 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.36.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37 (4).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37 (5).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.37.jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.38 (1).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.38 (2).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.38 (3).jpeg"),
			img("republic-day", "WhatsApp Image 2026-04-22 at 12.42.38.jpeg"),
			vid("republic-day", "WhatsApp Video 2026-04-22 at 12.42.32.mp4"),
			vid("republic-day", "WhatsApp Video 2026-04-22 at 12.42.36.mp4"),
		],
	},
	{
		id: "celebrations",
		title: "Celebrations",
		description:
			"School celebrations and special occasions bringing the community together.",
		year: "2025",
		emoji: "🎉",
		items: [
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.41 (1).jpeg"),
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.42 (3).jpeg"),
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.43 (2).jpeg"),
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.44 (1).jpeg"),
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.45 (1).jpeg"),
			img("celebrations", "WhatsApp Image 2026-04-22 at 12.42.49 (2).jpeg"),
		],
	},
	{
		id: "field-trip",
		title: "Field Trips",
		description:
			"Educational field trips enriching students' learning experiences.",
		year: "2025",
		emoji: "🚌",
		items: [
			img("field-trip", "WhatsApp Image 2026-04-22 at 12.42.39 (1).jpeg"),
			img("field-trip", "WhatsApp Image 2026-04-22 at 12.42.40 (1).jpeg"),
			img("field-trip", "WhatsApp Image 2026-04-22 at 12.42.40 (2).jpeg"),
			img("field-trip", "WhatsApp Image 2026-04-22 at 12.42.48 (2).jpeg"),
		],
	},
	{
		id: "teacher-development",
		title: "Teacher Development",
		description:
			"Professional development programs keeping our teachers at the forefront of education.",
		year: "2025",
		emoji: "👩‍🏫",
		items: [
			img(
				"professional-development-for-teacher",
				"WhatsApp Image 2026-04-22 at 12.42.49 (1).jpeg"
			),
		],
	},
];

export const ALL_GALLERY_ITEMS: (GalleryItem & {
	categoryId: string;
	categoryTitle: string;
})[] = GALLERY_CATEGORIES.flatMap((cat) =>
	cat.items.map((item) => ({
		...item,
		categoryId: cat.id,
		categoryTitle: cat.title,
	}))
);
