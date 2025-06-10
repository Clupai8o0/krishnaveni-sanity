import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "ctaBtns", title: "CTA Buttons", type: "ctaBtns" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
