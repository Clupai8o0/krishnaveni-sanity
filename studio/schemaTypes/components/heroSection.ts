import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "images", title: "Images", type: "object", fields: [
      defineField({ name: "desktop", title: "Desktop", type: "image" }),
      defineField({ name: "mobile", title: "Mobile", type: "image" }),
    ] }),
    defineField({ name: "ctaBtns", title: "CTA Buttons", type: "ctaBtns" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
