/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,json,,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'smoke-white': '#F3F3F3',
        black: '#131313',
        grey: '#828282',
        stroke: '#454545',
        accent: '#0038FF',
        'yna-pink': '#ff007b',
        'yna-purple': '#4e15ed',
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
      body: 'Golos Text, system-ui, sans-serif',
    },
  },
  //safelist: ['transform-x-4', 'transform-y-4'],
  plugins: [],
}

