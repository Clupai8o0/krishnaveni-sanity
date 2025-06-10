import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text" }),
    defineField({ name: "metaKeywords", title: "Meta Keywords", type: "string" }),
  ],
});
