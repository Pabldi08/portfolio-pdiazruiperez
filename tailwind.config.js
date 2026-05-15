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
        extend: {
            animation: {
                marquee: "marquee 30s linear infinite",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to:   { transform: "translateX(-50%)" },
                },
            },
        }
    },
    plugins: []
};
