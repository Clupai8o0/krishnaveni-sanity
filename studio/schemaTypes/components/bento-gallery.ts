import { defineField, defineType } from "sanity";

export const bentoGallery = defineType({
  name: "bentoGallery",
  title: "Bento Gallery",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile Image",
              type: "image",
            }),
            defineField({
              name: "desktopImage",
              title: "Desktop Image",
              type: "image",
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
  ],
});
