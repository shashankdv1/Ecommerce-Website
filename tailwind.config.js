/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        '40': '400px',
        '50':'500px',
        '30':'300px',
        '20':'200px',
      },
      
    },
  },
  plugins: [],
  purge: {
    enabled: false, // Disable purging temporarily
  },
};


