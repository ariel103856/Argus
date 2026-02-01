import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                // דורס את ברירת המחדל של טיילווינד לטובת רוביק
                sans: ['"Rubik"', 'sans-serif'],
                brand: ['"Orbitron"', 'sans-serif'],
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()]
}