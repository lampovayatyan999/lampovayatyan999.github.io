/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        body: 'var(--body-color)',
        container: 'var(--container-color)',
        title: 'var(--title-color)',
        text: 'var(--text-color)',
        border: 'var(--border-color)',
      },
    },
  },
  plugins: [],
}
