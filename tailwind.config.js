/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#000000',
          900: '#070708',
          850: '#0a0a0c',
          800: '#0e0f12',
          700: '#15171c',
          600: '#1d2027',
        },
        circuit: '#00C2FF',
        circuitDim: '#0090c2',
        circuitDeep: '#062a36',
        offwhite: '#eef1f6',
        mute: '#888d99',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(0,194,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(0,194,255,0.35)',
        glowLg: '0 0 70px rgba(0,194,255,0.22)',
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        scan: 'scan 6s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
