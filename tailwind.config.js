// tailwind.config.js
// Colors and fonts point at CSS variables that the style engine (src/theme) sets at runtime,
// so every Tailwind class below re-skins automatically when the art style changes.
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class', // the engine toggles `dark` on <html>
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // mobile landscape
        'xs-landscape': { raw: '(max-height: 450px) and (orientation: landscape)' },
      },
      colors: {
        bg: c('bg'),
        bg2: c('bg2'),
        card: c('card'),
        ink: c('ink'),
        muted: c('muted'),
        line: c('line'),
        accent: c('accent'),
        'accent-ink': c('accent-ink'),
        accent2: c('accent2'),
        accent3: c('accent3'),
        'on-accent': c('on-accent'),
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
