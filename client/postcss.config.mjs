/** @type {import('postcss-load-config').Config} */
const config = {
  darkMode: ["class"], // 🚀 This must match the attribute in ThemeProvider
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
