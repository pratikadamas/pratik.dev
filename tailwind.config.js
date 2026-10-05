/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Dark palette tokens
        dark: {
          bg: '#0D0F0E',
          card: '#171A18',
          surface: '#131614',
          border: '#282D2A',
          'border-hover': '#3E4540',
          text: '#F1F3EF',
          muted: '#A5ADA7',
          dim: '#707872',
        },
        // Light palette tokens
        light: {
          bg: '#F4F3EE',
          card: '#F8F7F2',
          surface: '#EFECE4',
          border: '#D8D8D0',
          'border-hover': '#B5B5AC',
          text: '#171A18',
          muted: '#555D58',
          dim: '#7D8580',
        },
        // Sage green accent (sparingly used ~5%)
        sage: {
          300: '#A3D1B3',
          400: '#8FBF9F', // Dark mode accent
          500: '#6FA382',
          600: '#4F765C', // Light mode accent
          700: '#3D5C47',
        },
      },
    },
  },
  plugins: [],
}
