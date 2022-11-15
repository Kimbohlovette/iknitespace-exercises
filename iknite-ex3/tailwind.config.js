/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './public/**/*.html',
        './src/**/*.{html,js}',
      ],
  theme: {
    extend: {
        fontFamily: {
            lexend: ['Lexend']
        }
    },
  },
  plugins: [],
}
