import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === "production",
});

export type Post = {
	_id: string;
	title: string;
	slug: string;
	category: string;
	content: string | null;
	thumbnailUrl: string | null;
	images: string[] | null;
	videos: string[] | null;
	reverseLayout: boolean | null;
	published: boolean;
	publishedAt: string | null;
	_createdAt: string;
};

export const POSTS_QUERY = `
*[_type == "post" && published == true] | order(publishedAt desc) {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[_type == "image"].asset->url,
  "videos": images[_type == "file"].asset->url,
  reverseLayout, publishedAt, _createdAt
}`;

export const UPDATES_QUERY = `
*[_type == "post" && published == true && !(category in ["achievement", "achievements"])] | order(publishedAt desc) {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[_type == "image"].asset->url,
  "videos": images[_type == "file"].asset->url,
  reverseLayout, publishedAt, _createdAt
}`;

export const POST_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug && published == true][0] {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[_type == "image"].asset->url,
  "videos": images[_type == "file"].asset->url,
  reverseLayout, publishedAt, _createdAt
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && published == true]{ "slug": slug.current }`;

export const ACHIEVEMENTS_QUERY = `
*[_type == "post" && published == true && category in ["achievement", "achievements"]] | order(publishedAt desc) {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[_type == "image"].asset->url,
  "videos": images[_type == "file"].asset->url,
  reverseLayout, publishedAt, _createdAt
}`;

export const FACILITIES_QUERY = `
*[_type == "facility"] | order(order asc) {
  _id, title, description,
  "color": color.hex,
  category,
  "imageUrl": image.asset->url,
  order
}`;
