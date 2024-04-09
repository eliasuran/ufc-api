/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      colors: {
        text: "#121212",
        bg: "#F5F5F5",
        primary: "#F05454",
        secondary: "#30475E",
      },
    }
  },

	plugins: []
};

module.exports = config;
