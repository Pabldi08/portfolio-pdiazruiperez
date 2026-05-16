import { getFeaturedProjects } from "../data/projects.js?v=771f78e24b";
import { contacts } from "../data/contacts.js?v=771f78e24b";
import { resumeItems } from "../data/resume.js?v=771f78e24b";
import { stackItems } from "../data/stack.js?v=771f78e24b";
import { contactLink } from "../components/contactLink.js?v=771f78e24b";
import { iconBriefcase } from "../components/icons.js?v=771f78e24b";
import { projectCard } from "../components/projectCard.js?v=771f78e24b";
import { stackCard } from "../components/stackCard.js?v=771f78e24b";
import { t, localizeItem } from "../i18n.js?v=771f78e24b";

export function homeView() {
    const featured = getFeaturedProjects();

    return `
        <header class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
            <section>
                <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-300">
                    <span class="h-2 w-2 rounded-full bg-sky-400"></span>
                    ${t("home_badge")}
                </div>

                <h1 class="text-5xl font-black leading-tight tracking-tight md:text-7xl">
                    ${t("home_hero_prefix")}
                    <span class="bg-gradient-to-r from-sky-300 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                        ${t("home_hero_highlight")}
                    </span>
                </h1>

                <p class="text-description mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                    ${t("home_hero_desc")}
                </p>

                <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a href="/proyectos"
                        class="rounded-full bg-sky-400 px-7 py-3 text-center font-bold text-zinc-950 shadow-lg shadow-sky-400/20 transition hover:-translate-y-1 hover:bg-sky-300">
                        ${t("home_btn_projects")}
                    </a>
                    <a href="/cv"
                        class="rounded-full border border-white/15 px-7 py-3 text-center font-bold text-zinc-200 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-300">
                        ${t("home_btn_cv")}
                    </a>
                </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40">
                <div class="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                    <div class="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-3">
                        <span class="h-3 w-3 rounded-full bg-red-500"></span>
                        <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                        <span class="h-3 w-3 rounded-full bg-green-500"></span>
                        <span class="ml-3 text-xs text-zinc-400">terminal</span>
                    </div>

                    <div class="space-y-4 p-6 font-mono text-sm">
                        <p><span class="text-sky-400">pablo@portfolio</span>:<span class="text-cyan-300">~</span>$ java Main</p>
                        <p class="text-zinc-400">${t("home_terminal_compiling")}</p>
                        <p class="text-zinc-300">${t("home_terminal_oop")}</p>
                        <p class="text-zinc-300">${t("home_terminal_logic")}</p>
                        <p class="text-zinc-300">${t("home_terminal_clean")}</p>
                        <p><span class="text-sky-400">Output:</span> ${t("home_terminal_output")}</p>
                    </div>
                </div>
            </section>
        </header>

        <section id="cv" class="mx-auto max-w-6xl px-6 py-20">
            <div class="mb-12 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-100">
                        ${iconBriefcase()}
                    </span>
                    <div>
                        <p class="mb-1 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("home_cv_label")}</p>
                        <h2 class="text-4xl font-black tracking-tight md:text-5xl">${t("home_cv_title")}</h2>
                    </div>
                </div>
                <a href="/assets/cv.pdf" download
                    class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-zinc-200 transition hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-300">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    ${t("home_cv_download")}
                </a>
            </div>

            <div class="relative">
                <div class="absolute bottom-8 left-3 top-3 w-px bg-white/15 md:left-4"></div>
                <div class="space-y-14">
                    ${resumeItems.map(item => resumeItem(localizeItem(item))).join("")}
                </div>
            </div>
        </section>

        <section id="proyectos-destacados" class="mx-auto max-w-6xl px-6 py-20">
            <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("home_featured_label")}</p>
                    <h2 class="text-4xl font-black tracking-tight md:text-5xl">${t("home_featured_title")}</h2>
                </div>
                <a href="/proyectos" class="text-sm font-bold text-cyan-300 transition hover:text-cyan-200">
                    ${t("home_featured_all")}
                </a>
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                ${featured.map(p => projectCard(localizeItem(p))).join("")}
            </div>
        </section>

        <section id="stack" class="border-y border-white/10 bg-white/[0.03]">
            <div class="mx-auto max-w-6xl px-6 py-20">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("home_stack_label")}</p>
                <h2 class="mb-12 text-4xl font-black tracking-tight">${t("home_stack_title")}</h2>

                <div class="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        ${[...stackItems, ...stackItems].map(stackCard).join("")}
                    </div>
                </div>
            </div>
        </section>

        <section id="contacto" class="mx-auto max-w-6xl px-6 py-20">
            <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("home_contact_label")}</p>
                    <h2 class="text-4xl font-black tracking-tight">${t("home_contact_title")}</h2>
                    <a href="/contacto" class="mt-4 inline-flex text-sm font-bold text-sky-400 transition hover:text-sky-300">
                        ${t("home_contact_cta")}
                    </a>
                </div>

                <div class="flex flex-wrap gap-4">
                    ${contacts.map(contactLink).join("")}
                </div>
            </div>
        </section>
    `;
}

function resumeItem(item) {
    return `
        <article class="relative grid gap-5 pl-12 md:grid-cols-[0.9fr_1.5fr] md:gap-12 md:pl-16">
            <span class="absolute left-0 top-2 z-10 h-7 w-7 rounded-full border-4 border-zinc-950 bg-sky-400 shadow-lg shadow-sky-400/25 md:left-1"></span>

            <div>
                <h3 class="text-2xl font-black leading-tight text-sky-300">${item.title}</h3>
                <p class="mt-2 text-xl font-black text-white">${item.organization}</p>
                <p class="mt-2 text-sm font-bold text-zinc-400">${item.period}</p>
            </div>

            <div>
                <p class="text-description max-w-2xl text-lg leading-8 text-zinc-300">${item.description}</p>
                ${resumeLink(item)}
            </div>
        </article>
    `;
}

function resumeLink(item) {
    if (!item.link) {
        return "";
    }

    const isExternal = item.link.href.startsWith("http");
    const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";

    return `
        <a href="${item.link.href}"${target}
            class="mt-4 inline-flex text-base font-black text-amber-200 transition hover:text-amber-100">
            ${item.link.label} &rarr;
        </a>
    `;
}
