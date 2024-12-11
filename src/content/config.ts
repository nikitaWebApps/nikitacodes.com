import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
const projects = defineCollection({
  loader: glob({ pattern: 'projects/{en,ru}/*.json', base: './src/content/' }),
  schema: z.object({
    imageKey: z.string(),
    publishedDate: z.coerce.date(),
    techStack: z.string().array(),
    siteLink: z.string().optional(),
    title: z.string(),
    keyFeatures: z.string().array().optional(),
  }),
})

const head = defineCollection({
  loader: glob({ pattern: 'head.json', base: './src/content/' }),
  schema: z.object({
    name: z.object({
      en: z.string(),
      ru: z.string(),
    }),
    description: z.object({
      en: z.string(),
      ru: z.string(),
    }),
    resume_link: z.object({
      en: z.string(),
      ru: z.string(),
    }),
  }),
})

export const collections = {
  head,
  projects,
}

