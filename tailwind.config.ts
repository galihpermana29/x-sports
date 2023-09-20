import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        login: "url('/assets/bg-login.png')",
      },
      colors: {
        xport: {
          black: {
            primary: '#22272F',
            light: '#2A313B',
            alternate: '#252A33',
          },
          gray: {
            primary: '#546175',
            dark: '#454545',
            alternate: '#333B47',
          },
          orange: {
            primary: '#F44D0E',
            light: '#FFA559',
          },
          light: '#9EB5DB',
          white: '#FFF',
          cream: '#FFE6C7',
          game: {
            dota: '#F84434',
            cs: '#FFB404',
            mlbb: '#288CE4',
            lol: '#48C454',
            'rocket-league': '#28C4E4',
            valorant: '#FF5454',
            fifa: '#080404',
            'rainbow-six': '#FFF',
            pubg: '#FFB404',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
