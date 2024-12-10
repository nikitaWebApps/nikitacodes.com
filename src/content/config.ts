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

export const collections = {
  projects,
}

