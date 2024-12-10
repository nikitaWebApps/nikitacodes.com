import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
const projects = defineCollection({
  loader: glob({ pattern: 'projects/{en,ru}/*.json', base: './src/content/' }),
  schema: z.object({
    imageKey: z.string(),
    publishedDate: z.coerce.date(),
    techStack: z.string().array(),
    en: z.object({
      title: z.string(),
      description: z.string(),
    }),
    ru: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
})

export const collections = {
  projects,
}

