// postcss.config.js (Correct)
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // <--- Use the dedicated plugin
    require('autoprefixer'),
  ],
};