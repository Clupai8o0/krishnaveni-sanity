import { defineField, defineType } from "sanity";

export const featureCards = defineType({
  name: "featureCards",
  title: "Feature Cards",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "cards", title: "Cards", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "title", title: "Title", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text" }),
      defineField({ name: "icon", title: "Icon", type: "string" }),
      defineField({ name: "color", title: "Color", type: "string" }),
    ] }],
    }),
  ],
})