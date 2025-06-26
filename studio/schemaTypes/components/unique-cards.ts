import { defineField, defineType } from "sanity";

export const uniqueCards = defineType({
  name: "uniqueCards",
  title: "Unique Cards",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
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
              name: "icon",
              title: "Icon",
              type: "string",
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
