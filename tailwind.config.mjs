/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'hh-red': '#D6001C',
      },
      aspectRatio: {
        photo: '4 / 3',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: '500ms slideDown 200ms ease-in backwards',
      },
    },
    fontFamily: {
      body: 'Inter, system-ui, sans-serif',
    },
  },
  plugins: [],
}

