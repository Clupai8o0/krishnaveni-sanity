import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "language", title: "Language", type: "string", hidden: true }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: {
        list: ["home", "about", "academics", "admission", "campusLife", "contact", "parents"],
      },
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "array",
      of: [{ type: "heroSection" }, { type: "featureCards" }],
    }),
  ],
});
