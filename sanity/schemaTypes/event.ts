import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Name",
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
      name: "eventDate",
      title: "Event Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventEndDate",
      title: "Event End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Conference", value: "conference" },
          { title: "Webinar", value: "webinar" },
          { title: "Trade Show", value: "tradeshow" },
          { title: "Field Event", value: "field" },
          { title: "Virtual", value: "virtual" },
        ],
      },
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "North America", value: "na" },
          { title: "Europe", value: "emea" },
          { title: "Asia Pacific", value: "apac" },
          { title: "Global / Virtual", value: "global" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: 'Location (city, venue or "Virtual")',
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      placeholder: "Register Now",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "url",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Event Date, Soonest First",
      name: "eventDateAsc",
      by: [{ field: "eventDate", direction: "asc" }],
    },
  ],
});
