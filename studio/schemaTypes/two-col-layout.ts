import { defineField, defineType } from "sanity";

export const twoColLayout = defineType({
  name: "twoColLayout",
  title: "Two Column Layout",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "reverse",
      title: "Reverse",
      type: "boolean",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "imageFit",
      title: "Image Fit",
      type: "string",
      options: {
        list: ["cover", "contain"],
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
