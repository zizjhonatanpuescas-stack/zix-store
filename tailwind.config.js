/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: { ink: '#111114', mist: '#f5f5f7', platinum: '#e7e7eb' },
      boxShadow: { premium: '0 24px 80px rgba(17,17,20,.12)', glass: '0 18px 60px rgba(15,23,42,.12)' },
      animation: { 'fade-up': 'fadeUp .6s ease both', float: 'float 7s ease-in-out infinite' },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } }
      }
    }
  },
  plugins: []
};
