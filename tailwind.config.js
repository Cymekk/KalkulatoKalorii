const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("progress-unfilled", ["&::-webkit-progress-bar", "&"])
			addVariant("progress-filled", [
				"&::-webkit-progress-value",
				"&::-moz-progress-bar",
				"&",
			])
		}),
	],
}
