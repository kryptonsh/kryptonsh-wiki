// tailwind theme
/** @type {import('tailwindcss/tailwind-config').TailwindTheme} */
const theme = {
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    background: '#151515',
    foreground: '#242424',
    elevated: '#2e2e2e',
    muted: 'darkgray'
  },
  textColor: {
    primary: '#fff',
    secondary: 'darkgray'
  },
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  }
};

const config = {
  content: ['./src/**/*.{html,js,svelte,svx,ts}'],

  theme: {
    extend: {
      ...theme
    }
  },

  plugins: []
};

module.exports = config;
