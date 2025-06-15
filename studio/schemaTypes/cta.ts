import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "ctaBtns",
      title: "CTA Buttons",
      type: "ctaBtns",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "object",
      fields: [
        defineField({ name: "desktop", title: "Desktop", type: "image" }),
        defineField({ name: "mobile", title: "Mobile", type: "image" }),
      ],
    }),
  ],
});
