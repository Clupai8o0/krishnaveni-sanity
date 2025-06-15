import { defineField, defineType } from "sanity";

export const testimonials = defineType({
	name: "testimonials",
	title: "Testimonials",
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "testimonials",
			title: "Testimonials",
			type: "array",
			of: [
				defineField({
					name: "testimonial",
					title: "Testimonial",
					type: "object",
					fields: [
						defineField({
							name: "video",
							title: "Video",
							type: "file",
						}),
						defineField({
							name: "thumbnail",
							title: "Thumbnail",
							type: "image",
						}),
						defineField({
							name: "author",
							title: "Author",
							type: "string",
						}),
						defineField({
							name: "authorTitle",
							title: "Author Title",
							type: "string",
						}),
					],
				}),
			],
		}),
	],
});