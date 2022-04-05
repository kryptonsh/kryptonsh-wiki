// tailwind theme
/** @type {import('tailwindcss/tailwind-config').TailwindTheme} */
const theme = {
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    background: '#151515',
    foreground: '#242424',
    elevated: '#2e2e2e',
    muted: '#272727',
  },
  textColor: {
    primary: '#fff',
    secondary: 'darkgray',
    muted: '#272727',
  },
  fontFamily: {
    roboto: ['Roboto', 'sans-serif'],
    condensed: ['Roboto Condensed', 'sans-serif'],
    sans: ['Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
};

const config = {
  content: ['./src/**/*.{html,js,svelte,svx,ts}'],

  theme: {
    extend: {
      ...theme,
    },
  },

  plugins: [],
};

module.exports = config;
