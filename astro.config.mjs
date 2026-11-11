import {defineConfig} from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
    prefetch: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    trailingSlash: 'ignore',
    vite: {
        plugins: [tailwindcss()],
    },
})
