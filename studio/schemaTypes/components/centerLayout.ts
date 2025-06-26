import { defineField, defineType } from "sanity";

export const centerLayout = defineType({
  name: "centerLayout",
  title: "Center Layout",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "table" },
        { type: "image" },
      ],
    }),
  ],
});
