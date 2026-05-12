/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        /* Warm ivory backgrounds */
        ivory: {
          50:  '#fefdfb',
          100: '#faf9f6',
          200: '#f5f3ee',
          300: '#ede9e2',
          400: '#e0dbd2',
          500: '#cec8bd',
        },
        /* Stone grays */
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        /* Sky blue accent */
        sky: {
          50:  '#f0f7ff',
          100: '#dff0ff',
          200: '#b9dfff',
          300: '#7ec8fd',
          400: '#38adfa',
          500: '#0e95eb',
          600: '#0275c9',
          700: '#035da3',
          800: '#074e87',
          900: '#0c4270',
        },
        /* Peach / coral accent */
        peach: {
          50:  '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd0c4',
          300: '#ffad97',
          400: '#f98068',
          500: '#ee5f46',
          600: '#d94429',
          700: '#b5351e',
          800: '#952f1c',
          900: '#7c2c1d',
        },
        /* Lavender accent */
        lavender: {
          50:  '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb5fd',
          400: '#9e8df9',
          500: '#8366f4',
          600: '#6d46ea',
          700: '#5b34d1',
          800: '#4b2bab',
          900: '#3f268a',
        },
      },
      boxShadow: {
        'xs':    '0 1px 2px rgba(0,0,0,0.05)',
        'soft':  '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)',
        'card':  '0 2px 8px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.07), 0 16px 48px rgba(0,0,0,0.08)',
        'float': '0 8px 32px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06)',
        'inner-soft': 'inset 0 1px 3px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up':   'fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'float':     'float 5s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'bar-grow':  'barGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':   'shimmer 2.5s ease infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        barGrow:  { from: { transform: 'scaleY(0)' }, to: { transform: 'scaleY(1)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
