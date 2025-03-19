import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#FFAE00',
          foreground: '#282828',
        },
        secondary: {
          DEFAULT: '#2252B1',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#FF7164',
          foreground: '#ffffff',
        },
        tertiary: {
          DEFAULT: '#030712',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#AB2222',
          foreground: '#ffffff',
        },
        dark: {
          DEFAULT: '#282828',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#E4E4E4',
          foreground: '#555555',
        },
        card: {
          DEFAULT: '#F1F1F1',
          foreground: '#282828',
        },
        success: {
          DEFAULT: '#06643D',
          foreground: '#282828',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
