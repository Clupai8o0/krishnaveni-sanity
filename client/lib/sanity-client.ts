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
	videoUrl: string | null;
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
  "images": images[].asset->url,
  videoUrl, publishedAt, _createdAt
}`;

export const POST_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug && published == true][0] {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "images": images[].asset->url,
  videoUrl, publishedAt, _createdAt
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && published == true]{ "slug": slug.current }`;
