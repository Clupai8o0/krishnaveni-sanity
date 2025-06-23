import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
        }),
        defineField({
          name: "map",
          title: "Map",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "email",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "whatsapp",
          title: "Whatsapp",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "object",
      fields: [
        defineField({
          name: "monFri",
          title: "Monday-Friday",
          type: "string",
        }),
        defineField({
          name: "sat",
          title: "Saturday",
          type: "string",
        }),
        defineField({
          name: "sun",
          title: "Sunday",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "transport",
      title: "Transport",
      type: "string"
    })
  ],
});
