// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'
// 2. Define your collection(s)
const blogposts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			cover: image(),
			altCover: z.string().optional(),
			priority: z.number().optional(),
		}),
})

const project = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			tabTitle: z.string(),
			cover: image(),
			role: z.string(),
			tech: z.string().array(),
			link: z.string().url(),
			priority: z.number().optional(),
		}),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	blogposts: blogposts,
	cases: project,
}

