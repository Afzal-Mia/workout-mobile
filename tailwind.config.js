/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#237227',
        secondary: '#085b99',
        accent: '#F97316',
        destructive: '#ef4444',
        background: '#ffffff',
        foreground: '#171717',
        border: '#e4e4e7',
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a'
        }
      }
    },
  },
  plugins: [],
}
