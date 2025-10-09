/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#0B132B',
				secondary: '#1C2541',
				accent: '#5BC0BE',
				buttonHover: '#3A506B',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
