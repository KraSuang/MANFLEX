/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#011627"
                },
                content: {
                    DEFAULT: "#041F3B"
                },
                border: {
                    DEFAULT: "#1E488C",
                },
                text: {
                    DEFAULT: "#FFFFFF"
                },
                button: {
                    DEFAULT: "#011627",
                    hover: {
                        DEFAULT: "#1E488C",
                    },
                    border: {
                        DEFAULT: "#1E488C",
                        hover: "#FFFFFF"
                    },
                }
            },
            fontFamily: {
                "JetBrains": ['JetBrains', 'sans-serif']
            },
        },
    },
    plugins: [],
}

