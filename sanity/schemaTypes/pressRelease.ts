import { defineField, defineType } from "sanity";

export default defineType({
  name: "pressRelease",
  title: "Press Release",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishAt",
      title: "Scheduled Publish Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary (used in listing)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Press Release Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contactName",
      title: "Media Contact Name",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Media Contact Email",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Publish Date, Newest First",
      name: "publishAtDesc",
      by: [{ field: "publishAt", direction: "desc" }],
    },
  ],
});
