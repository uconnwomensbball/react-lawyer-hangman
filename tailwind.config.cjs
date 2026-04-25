/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        bzks: ['Bpmf Zihi Kai Std', 'sans-serif'
        ]
      },
       keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'verdict': 'fadeIn 3s ease-in forwards',
        'playagain': 'fadeIn 3s ease-in 2s forwards',
      },
    },
  },
  plugins: [],
}

