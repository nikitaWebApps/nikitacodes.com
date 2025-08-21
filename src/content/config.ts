import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'
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
    title: z.object({
      en: z.string(),
    }),
    description: z.object({
      en: z.string(),
    }),
    resume_link: z.object({
      en: z.string(),
    }),
  }),
})

const jobItem = z.object({
  position: z.string(),
  company: z.string(),
  dates: z.string(),
  responsibilities: z.string().array(),
})

const resume = defineCollection({
  loader: glob({ pattern: 'resume.json', base: './src/content/' }),
  schema: z.object({
    description: z.object({
      en: z.string(),
    }),
    jobs: z
      .object({
        en: jobItem,
      })
      .array(),
  }),
})

const skills = defineCollection({
  loader: glob({ pattern: 'skills.json', base: './src/content/' }),
  schema: z.string().array(),
})

const educationObject = z.object({
  icon_key: z.string(),
  en: z.object({
    profession: z.string(),
    place: z.string(),
    dates: z.string(),
  }),
})

const education = defineCollection({
  loader: glob({ pattern: 'education.json', base: './src/content/' }),
  schema: z.object({
    description: z.object({
      en: z.string(),
    }),
    education: educationObject.array(),
    courses: educationObject.array(),
  }),
})

export const collections = {
  head,
  projects,
  resume,
  skills,
  education,
}

