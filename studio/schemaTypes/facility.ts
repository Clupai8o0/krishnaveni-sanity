import { defineField, defineType } from "sanity";

export const facility = defineType({
  name: "facility",
  title: "Facility",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Accent Color",
      type: "color",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Academics", value: "Academics" },
          { title: "Technology", value: "Technology" },
          { title: "Campus", value: "Campus" },
          { title: "Science", value: "Science" },
          { title: "Arts", value: "Arts" },
          { title: "Sports", value: "Sports" },
          { title: "Transport", value: "Transport" },
          { title: "AI & Tech", value: "AI & Tech" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Cards 1–4 appear in the bento grid.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title,
        subtitle: `#${order ?? "–"} · ${subtitle ?? ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
