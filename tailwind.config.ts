import type { Config } from 'tailwindcss';

/**
 * Tailwind configuration for WesDev.
 *
 * All color tokens map to the OKLCH CSS custom properties defined in
 * `app/globals.css` — components reference these theme tokens rather than
 * hardcoding color values (single source of truth, see build spec §2 / §11).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        'line-soft': 'var(--line-soft)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-ink': 'var(--accent-ink)',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--r)',
        sm: 'calc(var(--r) - 1px)',
        pill: '100px',
      },
      maxWidth: {
        container: 'var(--maxw)',
      },
      keyframes: {
        pulse: {
          '0%': {
            boxShadow:
              '0 0 0 0 color-mix(in oklch, var(--accent) 60%, transparent)',
          },
          '70%': { boxShadow: '0 0 0 7px transparent' },
          '100%': { boxShadow: '0 0 0 0 transparent' },
        },
      },
      animation: {
        'pulse-ring': 'pulse 2.6s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
