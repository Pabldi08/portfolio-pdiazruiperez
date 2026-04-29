import { renderRoute, setProjectFilter } from "./router.js";

document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");
    if (!filterButton) return;

    setProjectFilter(filterButton.dataset.filter);
});

window.addEventListener("hashchange", renderRoute);
renderRoute();
