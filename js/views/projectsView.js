import { getAllTags, getProjectsByTag } from "../data/projects.js?v=771f78e24b";
import { projectCard } from "../components/projectCard.js?v=771f78e24b";
import { t, localizeItem } from "../i18n.js?v=771f78e24b";

export function projectsView(activeFilter) {
    const tags = getAllTags();
    const visibleProjects = getProjectsByTag(activeFilter);
    const allLabel = t("filter_all");

    return `
        <section class="mx-auto max-w-6xl px-6 py-20">
            <a href="/" class="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-sky-300">${t("projects_back")}</a>
            <div class="mb-10 max-w-3xl">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("projects_label")}</p>
                <h1 class="text-5xl font-black tracking-tight md:text-7xl">${t("projects_title")}</h1>
                <p class="text-description mt-5 text-lg leading-8 text-zinc-400">
                    ${t("projects_desc")}
                </p>
            </div>

            <div class="mb-10 flex flex-wrap gap-3">
                ${tags.map(tag => filterButton(tag, activeFilter, allLabel)).join("")}
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                ${visibleProjects.map(p => projectCard(localizeItem(p))).join("")}
            </div>
        </section>
    `;
}

function filterButton(tag, activeFilter, allLabel) {
    const activeClasses = "border-sky-400 bg-sky-400 text-zinc-950";
    const idleClasses = "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-sky-400/60 hover:text-sky-300";
    const buttonClasses = activeFilter === tag ? activeClasses : idleClasses;
    const displayTag = tag === "Todos" ? allLabel : tag;

    return `
        <button type="button" data-filter="${tag}"
            class="rounded-full border px-4 py-2 text-sm font-bold transition ${buttonClasses}">
            ${displayTag}
        </button>
    `;
}
