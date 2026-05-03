/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./js/**/*.js"
    ],
    safelist: [
        "group-hover:text-emerald-300",
        "group-hover:text-cyan-300",
        "group-hover:text-amber-200",
        "group-hover:text-rose-200"
    ],
    theme: {
        extend: {}
    },
    plugins: []
};
