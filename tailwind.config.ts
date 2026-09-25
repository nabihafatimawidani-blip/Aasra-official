import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF7F0',   // Warm Ivory
          100: '#F1E8D8',  // Light Beige
          200: '#E2D3BC',  // Medium Beige
          300: '#D5C1A3',
          400: '#B09572',
          500: '#8B6F47',  // Soft Brown
          600: '#7B5E3C',
          700: '#6B4F32',  // Main Brown (Body text)
          800: '#4A3523',  // Dark Brown (Headings)
          900: '#352518',  // Deep Brown
          950: '#261A10',
        },

        gold: {
          50: '#FDFBF7',
          100: '#F9F3E7',
          200: '#F2E4C9',
          300: '#E6CF9F',
          400: '#D7B777',
          500: '#C49A5A',  // Muted Gold (Accent)
          600: '#B08447',
          700: '#8F6632',
          800: '#735028',
          900: '#54391C',
        },

        warm: {
          white: '#FFFFFF',
          ivory: '#FAF7F0',
          light: '#F1E8D8',
          beige: '#E2D3BC',
          soft: '#8B6F47',
          brown: '#6B4F32',
          dark: '#4A3523',
          deep: '#352518',
          gold: '#C49A5A',
          secondary: '#8B7355',
        },

        // Re-tune default slate to warm taupe/stone tones
        slate: {
          50: '#FAF7F0',   // Warm Ivory
          100: '#F1E8D8',  // Light Beige
          200: '#E2D3BC',  // Medium Beige border
          300: '#D5C4AC',
          400: '#AFA08C',
          500: '#8B7355',  // Secondary text (#8B7355)
          600: '#7D6448',
          700: '#6B4F32',  // Body text (#6B4F32)
          800: '#4A3523',  // Headings (#4A3523)
          900: '#352518',  // Deep Brown (#352518)
          950: '#261A10',
        },

        // Map amber to muted gold shades so legacy amber classes harmonize
        amber: {
          50: '#FDFBF7',
          100: '#F9F3E7',
          200: '#F2E4C9',
          300: '#E6CF9F',
          400: '#C49A5A',
          500: '#C49A5A',  // Muted Gold
          600: '#B08447',
          700: '#8F6632',
          800: '#735028',
          900: '#54391C',
        },

        // Map emerald to warm brown/gold shades to prevent any green appearance
        emerald: {
          50: '#FAF7F0',
          100: '#F1E8D8',
          200: '#E2D3BC',
          300: '#D5C1A3',
          400: '#C49A5A',
          500: '#8B6F47',
          600: '#7B5E3C',
          700: '#6B4F32',
          800: '#4A3523',
          900: '#352518',
        },

        accent: {
          gold: '#C49A5A',
          amber: '#C49A5A',
          teal: '#8B6F47',
          emerald: '#6B4F32',
        },

        cream: {
          50: '#FFFFFF',
          100: '#FAF7F0',
          200: '#F1E8D8',
        },

        charcoal: {
          50: '#FAF7F0',
          100: '#F1E8D8',
          700: '#6B4F32',
          800: '#4A3523',
          900: '#352518',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
    },
  },

  plugins: [],
};

export default config;