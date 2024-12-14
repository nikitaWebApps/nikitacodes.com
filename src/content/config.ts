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

const jobItem = z.object({
  position: z.string(),
  company: z.string(),
  dates: z.string(),
  responsibilities: z.string().array(),
})

const resume = defineCollection({
  loader: file('src/content/resume/resume.json', { parser: text => JSON.parse(text).resume }),
  schema: z.object({
    en: jobItem,
    ru: jobItem,
  }),
})

const skills = defineCollection({
  loader: file('src/content/resume/resume.json', {
    parser: text => {
      return JSON.parse(text).skills
    },
  }),
  schema: z.object({
    data: z.string().array(),
  }),
})

const educationObject = z.object({
  ru: z.object({
    profession: z.string(),
    place: z.string(),
    dates: z.string(),
  }),
  en: z.object({
    profession: z.string(),
    place: z.string(),
    dates: z.string(),
  }),
})

const education = defineCollection({
  loader: file('src/content/resume/resume.json', {
    parser: text => {
      return JSON.parse(text).education
    },
  }),
  schema: educationObject,
})

const courses = defineCollection({
  loader: file('src/content/resume/resume.json', {
    parser: text => {
      return JSON.parse(text).courses
    },
  }),
  schema: educationObject,
})

export const collections = {
  head,
  projects,
  resume,
  skills,
  education,
  courses,
}

