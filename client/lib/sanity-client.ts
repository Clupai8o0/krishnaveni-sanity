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

export const sanityWriteClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

export type Post = {
	_id: string;
	title: string;
	slug: string;
	category: string;
	content: string | null;
	thumbnailUrl: string | null;
	thumbnailRef: string | null;
	images: string[] | null;
	imageRefs: string[] | null;
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

export const ALL_POSTS_QUERY = `
*[_type == "post"] | order(_createdAt desc) {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "thumbnailRef": thumbnail.asset._ref,
  "images": images[].asset->url,
  "imageRefs": images[].asset._ref,
  videoUrl, published, publishedAt, _createdAt
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

export const POST_BY_ID_QUERY = `
*[_type == "post" && _id == $id][0] {
  _id, title,
  "slug": slug.current,
  category, content,
  "thumbnailUrl": thumbnail.asset->url,
  "thumbnailRef": thumbnail.asset._ref,
  "images": images[].asset->url,
  "imageRefs": images[].asset._ref,
  videoUrl, published, publishedAt, _createdAt
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && published == true]{ "slug": slug.current }`;
