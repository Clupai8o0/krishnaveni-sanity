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
    
  ]
})