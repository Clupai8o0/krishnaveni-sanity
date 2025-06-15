import { defineField, defineType } from "sanity";

export const introduction = defineType({
  name: "introduction",
  title: "Introduction",
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
      type: "text",
    }),
    defineField({
      name: "facts",
      title: "Facts",
      type: "array",
      of: [
        {
          type: "object",
          name: "fact",
          title: "Fact",
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
          ],
        },
      ],
    }),
    defineField({
      name: "ctaBtns",
      title: "CTA Buttons",
      type: "ctaBtns",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
});
