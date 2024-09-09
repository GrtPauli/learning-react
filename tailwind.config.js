/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          primary: 'var(--color-primary)',
          border: 'var(--color-border)',
        },
      },

      backgroundColor: {
        skin: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          primary: 'var(--color-primary)',
          border: 'var(--color-border)',
        },
      },

      borderColor: {
        skin: {
          border: 'var(--color-border)',
          primary: 'var(--color-primary)',
        }, 
      }
    },
  },
  plugins: [],
}

