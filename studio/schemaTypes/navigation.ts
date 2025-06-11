import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      of: [
        defineField({
          name: "navLink",
          title: "Nav Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "reference",
              to: [{ type: "page" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "reference",
          to: [{ type: "page" }],
        }),
      ],
    }),
  ],
});
