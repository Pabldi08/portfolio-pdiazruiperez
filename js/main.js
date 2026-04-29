import { renderRoute, setProjectFilter } from "./router.js";

const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    const toggle = document.querySelector("#theme-toggle");
    const moonIcon = document.querySelector("[data-theme-icon='moon']");
    const sunIcon = document.querySelector("[data-theme-icon='sun']");

    document.body.dataset.theme = nextTheme;
    localStorage.setItem(THEME_KEY, nextTheme);

    toggle?.setAttribute("aria-pressed", String(nextTheme === "light"));
    toggle?.setAttribute("aria-label", nextTheme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    moonIcon?.classList.toggle("hidden", nextTheme === "light");
    sunIcon?.classList.toggle("hidden", nextTheme !== "light");
}

function toggleTheme() {
    applyTheme(document.body.dataset.theme === "light" ? "dark" : "light");
}

document.addEventListener("click", (event) => {
    const themeToggle = event.target.closest("#theme-toggle");
    if (themeToggle) {
        toggleTheme();
        return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (!filterButton) return;

    setProjectFilter(filterButton.dataset.filter);
});

window.addEventListener("hashchange", renderRoute);
applyTheme(localStorage.getItem(THEME_KEY) ?? "dark");
renderRoute();
