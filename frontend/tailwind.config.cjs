/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          black:   '#0a0a0a',
          charcoal:'#1a1a1a',
          graphite:'#2e2e2e',
          smoke:   '#555555',
          silver:  '#aaaaaa',
          mist:    '#d4d4d4',
          snow:    '#f5f5f5',
          white:   '#ffffff',
        },
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight:{ from: { opacity: '0', transform: 'translateX(-24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulse2:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      animation: {
        fadeIn:     'fadeIn 0.5s ease forwards',
        slideRight: 'slideRight 0.5s ease forwards',
        pulse2:     'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
