import { homeView } from "./views/homeView.js";
import { projectDetailView } from "./views/projectDetailView.js";
import { projectsView } from "./views/projectsView.js";

let activeProjectFilter = "Todos";

export function renderRoute() {
    const app = document.querySelector("#app");
    const hash = window.location.hash || "#/";

    if (hash === "#/" || hash === "#") {
        app.innerHTML = homeView();
        window.scrollTo(0, 0);
        return;
    }

    if (hash === "#stack" || hash === "#sobre-mi" || hash === "#contacto") {
        app.innerHTML = homeView();
        requestAnimationFrame(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        });
        return;
    }

    if (hash === "#/proyectos") {
        app.innerHTML = projectsView(activeProjectFilter);
        window.scrollTo(0, 0);
        return;
    }

    if (hash.startsWith("#/proyectos/")) {
        app.innerHTML = projectDetailView(hash.replace("#/proyectos/", ""));
        window.scrollTo(0, 0);
        return;
    }

    app.innerHTML = homeView();
}

export function setProjectFilter(filter) {
    activeProjectFilter = filter;
    window.location.hash = "#/proyectos";
    renderRoute();
}
