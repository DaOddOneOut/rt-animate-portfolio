// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables dark mode via a 'dark' class
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        // Custom screen for mobile landscape responsiveness
        'xs-landscape': { raw: '(max-height: 450px) and (orientation: landscape)' },
      },
      colors: {
        parchment: '#f5f0e6',      // Warm paper tone
        ink: '#2d2d2d',            // Deep sketch line color
        graphite: '#555555',       // Softer text or accent gray
        sketchPurple: '#7c3aed'    // Highlight color (like pencil overlay)
      },
      fontFamily: {
        sketch: ['"Fredericka the Great"', 'cursive']
      },
      backgroundImage: {
        'paper-light': "url('/src/assets/paper-texture-light.png')",
        'paper-dark': "url('/src/assets/paper-texture-dark.png')",
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    }
  },
  plugins: []
};
