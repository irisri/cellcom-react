/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        archivoNarrow: ['Archivo_Narrow', 'sans-serif'],
      },
      colors: {
        amaranth: '#E63946',
        'off-white': '#F1FAEE',
        'off-white-50': '#B5BBB4',
        'jelly-bean': '#457B9D',
        'black-90': '#1E1E24',
      },
    },
  },
  plugins: [],
};
