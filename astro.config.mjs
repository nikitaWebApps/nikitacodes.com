import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	integrations: [vue(), tailwind(), mdx()],
	prefetch: true,
	redirects: {
		'/': '/ru',
	},
	markdown: {
		shikiConfig: {
			// Add custom languages
			// Note: Shiki has countless langs built-in, including .astro!
			// https://shiki.style/languages
			langs: ['javascript', 'typescript', 'php'],
			// Enable word wrap to prevent horizontal scrolling
			wrap: true,
			// Add custom transformers: https://shiki.style/guide/transformers
			// Find common transformers: https://shiki.style/packages/transformers
			transformers: [],
		},
	},
	i18n: {
		defaultLocale: 'ru',
		locales: ['en', 'ru'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
})

