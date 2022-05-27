const { defineConfig } = require('windicss/helpers');

module.exports = defineConfig({
  darkMode: 'class',
  plugins: [require('windicss/plugin/typography')],
  extend: {
    include: [
      'content/**/*.{md,yml,json,json5,csv}',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'assets/**/*.css',
      'app.vue',
    ],
  },

  theme: {
    extend: {
      color: {
        wicked: '#429ef5',
      },
      backgroundColor: {
        bgdark: {
          50: '#151515',
          100: '#171717',
          200: '#191919',
          300: '#1B1B1B',
          400: '#1D1D1D',
          500: '#1F1F1F',
          600: '#212121',
          700: '#232323',
          800: '#252525',
          900: '#272727',
        },
        bglight: {
          50: '#FAFAFA',
          100: '#F2F2F2',
          200: '#EAEAEA',
          300: '#E2E2E2',
          400: '#DADADA',
          500: '#D2D2D2',
          600: '#C9C9C9',
          700: '#C1C1C1',
          800: '#B9B9B9',
          900: '#B1B1B1',
        },
      },
      height: {
        header: '48px',
      },

      textColor: {
        light: {
          50: '#050506',
          100: '#0F1011',
          200: '#1C1D1E',
          300: '#3A3C3E',
          400: '#5E6062',
          500: '#828487',
          600: '#A6A8AA',
          700: '#C6C7C8',
          800: '#E2E2E2',
          900: '#FBFDFF',
        },
        dark: {
          50: '#FBFDFF',
          100: '#DFE2E6',
          200: '#C3C9CE',
          300: '#A9AFB5',
          400: '#8F969D',
          500: '#767D84',
          600: '#5E656C',
          700: '#474D53',
          800: '#31363B',
          900: '#1C1F22',
        },
        wicked: '#399BF8',
      },

      borderColor: {
        wicked: {
          50: '#183550',
          100: '#244F78',
          200: '#2F69A0',
          300: '#377EC1',
          400: '#3E90DF',
          500: '#429EF5',
          600: '#399BF8',
          700: '#3098FA',
          800: '#2795FC',
          900: '#1E92FF',
        },
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        condensed: ['Roboto Condensed', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
});
