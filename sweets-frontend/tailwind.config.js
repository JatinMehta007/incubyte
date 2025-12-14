/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:  {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
    },
  },
  animation: {
    spotlight: "spotlight 2s ease .75s 1 forwards",
  },
  keyframes: {
    spotlight: {
      "0%": {
        opacity: 0,
        transform: "translate(-72%, -62%) scale(0.5)",
      },
      "100%": {
        opacity: 1,
        transform: "translate(-50%,-40%) scale(1)",
      },
    },
  },
  plugins: [],
}


