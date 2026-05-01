import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Events", value: "events" },
          { title: "Achievements", value: "achievements" },
          { title: "Announcements", value: "announcements" },
          { title: "Republic Day", value: "republic-day" },
          { title: "Celebrations", value: "celebrations" },
          { title: "Field Trips", value: "field-trips" },
          { title: "Teacher Development", value: "teacher-development" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "images",
      title: "Images & Videos",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true } },
        { type: "file", options: { accept: "video/*" } },
      ],
    }),
    defineField({
      name: "reverseLayout",
      title: "Reverse Layout (Image on Left)",
      type: "boolean",
      description: "When a post has a single image, flip so the image appears on the left and text on the right.",
      initialValue: false,
      hidden: ({ document }) => {
        const images = (document?.images as unknown[]) ?? [];
        return images.length !== 1;
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
      published: "published",
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title,
        subtitle: `${subtitle ?? ""}${published ? "" : " (draft)"}`,
        media,
      };
    },
  },
});
