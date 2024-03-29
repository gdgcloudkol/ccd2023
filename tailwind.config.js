/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        'google-blue': '#4285f4',
        'google-red': '#ea4335',
        'google-yellow': '#fbbc05',
        'google-green': '#34a853',
        'g-gray-1': '#F2F2F2',
        'g-gray-2': '#E6E6E6',
        'g-gray-3': '#CCCCCC',
        'g-gray-4': '#B3B3B3',
        'g-gray-5': '#999999',
        'g-gray-6': '#808080',
        'g-gray-7': '#666666',
        'g-gray-8': '#4D4D4D',
        'g-gray-9': '#333333',
        'timer-blue': '#8AB4F8',
        'timer-bg': '#ffffff26'
      }
    }
  },
  plugins: [require('tailwindcss-animation-delay')]
};
