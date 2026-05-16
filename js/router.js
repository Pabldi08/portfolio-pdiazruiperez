import { homeView } from "./views/homeView.js?v=771f78e24b";
import { projectDetailView } from "./views/projectDetailView.js?v=771f78e24b";
import { projectsView } from "./views/projectsView.js?v=771f78e24b";
import { contactView } from "./views/contactView.js?v=771f78e24b";
import { getProjectBySlug } from "./data/projects.js?v=771f78e24b";
import { setupScrollAnimations } from "./animations.js?v=771f78e24b";
import { t } from "./i18n.js?v=771f78e24b";

let activeProjectFilter = "Todos";

function setTitle(title) {
    document.title = title ? `${title} | pdruiperez` : "pdruiperez | Portfolio";
}

export function renderRoute() {
    const app = document.querySelector("#app");
    const path = normalizePath(window.location.pathname);

    if (path === "/") {
        setTitle(null);
        app.innerHTML = homeView();
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    const sectionRoutes = {
        "/stack": "stack",
        "/cv": "cv",
        "/sobre-mi": "cv"
    };

    if (sectionRoutes[path]) {
        setTitle(null);
        app.innerHTML = homeView();
        setupScrollAnimations();
        requestAnimationFrame(() => {
            document.querySelector(`#${sectionRoutes[path]}`)?.scrollIntoView({ behavior: "smooth" });
        });
        return;
    }

    if (path === "/contacto") {
        setTitle("Contacto");
        app.innerHTML = contactView();
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    if (path === "/proyectos") {
        setTitle("Proyectos");
        app.innerHTML = projectsView(activeProjectFilter);
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    if (path.startsWith("/proyectos/")) {
        const slug = path.replace("/proyectos/", "");
        const project = getProjectBySlug(slug);
        setTitle(project?.title ?? "Proyecto");
        app.innerHTML = projectDetailView(slug);
        window.scrollTo(0, 0);
        setupScrollAnimations();
        return;
    }

    setTitle("Página no encontrada");
    app.innerHTML = notFoundView();
    setupScrollAnimations();
}

function notFoundView() {
    return `
        <section class="mx-auto max-w-3xl px-6 py-24 text-center">
            <p class="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("not_found_label")}</p>
            <h1 class="mt-4 text-5xl font-black tracking-tight">${t("not_found_title")}</h1>
            <p class="mt-5 text-lg text-zinc-400">${t("not_found_desc")}</p>
            <a href="/" class="mt-10 inline-flex rounded-full bg-sky-400 px-7 py-3 font-bold text-zinc-950 transition hover:bg-sky-300">
                ${t("not_found_back")}
            </a>
        </section>
    `;
}

export function navigateTo(path) {
    const nextPath = normalizePath(path);

    if (nextPath === normalizePath(window.location.pathname)) {
        renderRoute();
        return;
    }

    window.history.pushState({}, "", nextPath);
    renderRoute();
}

export function setProjectFilter(filter) {
    activeProjectFilter = filter;
    navigateTo("/proyectos");
}

function normalizePath(path) {
    if (!path || path === "/index.html") {
        return "/";
    }

    const cleanPath = path.replace(/\/+$/, "");
    return cleanPath || "/";
}
