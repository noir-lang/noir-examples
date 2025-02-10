/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      colors: {
        purple: {
          glass: 'rgba(59, 41, 96, 0.6)',
          'glass-dark': 'rgba(43, 28, 71, 0.7)',
        },
      },
    },
  },
  plugins: [],
};
