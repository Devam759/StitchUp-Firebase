/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C7A2',
        secondary: '#008F73',
        accent: '#F6D860',
        background: '#F8FAFC',
        text: '#0C0C0C',
      },
      borderRadius: {
        DEFAULT: '1rem', // rounded default
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}


