import { defineField, defineType } from "sanity";

export const ctaBtns = defineType({
  name: "ctaBtns",
  title: "CTA Buttons",
  type: "object",
  fields: [
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          name: "button",
          title: "Button",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "internalLink",
              title: "Internal Link",
              type: "reference",
              to: [{ type: "page" }],
            }),
            defineField({
              name: "externalLink",
              title: "External Link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["tel", "mailto", "https", "http", "www"],
                }),
            }),
            defineField({
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: ["primary", "secondary", "outline", "none"],
              },
            }),
          ],
        },
      ],
    }),
  ],
});
