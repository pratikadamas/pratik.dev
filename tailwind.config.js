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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      colors: {
        // Modern Dark palette tokens
        dark: {
          bg: '#0B0F17',
          card: '#111827',
          surface: '#151D2E',
          border: '#1E293B',
          'border-hover': '#334155',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B',
        },
        // Modern Light palette tokens
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          surface: '#F1F5F9',
          border: '#E2E8F0',
          'border-hover': '#CBD5E1',
          text: '#0F172A',
          muted: '#475569',
          dim: '#94A3B8',
        },
        // Electric Emerald & Teal Accent
        accent: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
    },
  },
  plugins: [],
}
