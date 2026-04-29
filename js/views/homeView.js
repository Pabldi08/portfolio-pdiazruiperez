import { getFeaturedProjects } from "../data/projects.js";
import { contacts } from "../data/contacts.js";
import { stackItems } from "../data/stack.js";
import { contactLink } from "../components/contactLink.js";
import { projectCard } from "../components/projectCard.js";
import { stackCard } from "../components/stackCard.js";

export function homeView() {
    const featured = getFeaturedProjects();

    return `
        <header class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
            <section>
                <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                    <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                    Portfolio personal en desarrollo
                </div>

                <h1 class="text-5xl font-black leading-tight tracking-tight md:text-7xl">
                    Desarrollo software con foco en
                    <span class="bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                        Java, C++, datos y backend.
                    </span>
                </h1>

                <p class="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                    Soy Pablo, estudiante de Ingenier&iacute;a Inform&aacute;tica en crecimiento. Aqu&iacute; documento proyectos, pr&aacute;cticas y experimentos:
                    desde juegos en consola hasta aplicaciones con arquitectura m&aacute;s seria.
                </p>

                <div class="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a href="#/proyectos"
                        class="rounded-full bg-emerald-400 px-7 py-3 text-center font-bold text-zinc-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300">
                        Ver todos los proyectos
                    </a>
                    <a href="#sobre-mi"
                        class="rounded-full border border-white/15 px-7 py-3 text-center font-bold text-zinc-200 transition hover:-translate-y-1 hover:border-emerald-400 hover:text-emerald-300">
                        Sobre m&iacute;
                    </a>
                </div>
            </section>

            <section class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40">
                <div class="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                    <div class="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-3">
                        <span class="h-3 w-3 rounded-full bg-red-500"></span>
                        <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                        <span class="h-3 w-3 rounded-full bg-green-500"></span>
                        <span class="ml-3 text-xs text-zinc-500">terminal</span>
                    </div>

                    <div class="space-y-4 p-6 font-mono text-sm">
                        <p><span class="text-emerald-400">pablo@portfolio</span>:<span class="text-cyan-300">~</span>$ java Main</p>
                        <p class="text-zinc-400">Compilando proyecto...</p>
                        <p class="text-zinc-300">OK POO aplicada</p>
                        <p class="text-zinc-300">OK L&oacute;gica de negocio separada</p>
                        <p class="text-zinc-300">OK C&oacute;digo limpio y mantenible</p>
                        <p><span class="text-emerald-400">Output:</span> listo para seguir aprendiendo.</p>
                    </div>
                </div>
            </section>
        </header>

        <section id="proyectos-destacados" class="mx-auto max-w-6xl px-6 py-20">
            <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Proyectos destacados</p>
                    <h2 class="text-4xl font-black tracking-tight md:text-5xl">Dos cosas que quiero ense&ntilde;ar primero</h2>
                </div>
                <a href="#/proyectos" class="text-sm font-bold text-cyan-300 transition hover:text-cyan-200">
                    Ver listado completo
                </a>
            </div>

            <div class="grid gap-8 md:grid-cols-2">
                ${featured.map(projectCard).join("")}
            </div>
        </section>

        <section id="stack" class="border-y border-white/10 bg-white/[0.03]">
            <div class="mx-auto max-w-6xl px-6 py-20">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Stack</p>
                <h2 class="mb-10 text-4xl font-black tracking-tight">Tecnolog&iacute;as que estoy trabajando</h2>

                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    ${stackItems.map(stackCard).join("")}
                </div>
            </div>
        </section>

        <section id="sobre-mi" class="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
            <div>
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Sobre m&iacute;</p>
                <h2 class="text-4xl font-black tracking-tight">Aprendo construyendo.</h2>
            </div>

            <div class="space-y-6 text-lg leading-8 text-zinc-400">
                <p>
                    Me interesa especialmente entender c&oacute;mo se estructura bien un programa: separar responsabilidades,
                    escribir c&oacute;digo legible y construir soluciones que no sean solo &ldquo;que funcionen&rdquo;, sino que puedan mantenerse.
                </p>
                <p>
                    Este portfolio es tambi&eacute;n una forma de documentar mi evoluci&oacute;n como desarrollador: proyectos peque&ntilde;os,
                    pr&aacute;cticas, ideas y mejoras constantes.
                </p>

                <div class="grid gap-4 pt-4 sm:grid-cols-3">
                    <div class="rounded-2xl bg-emerald-400/10 p-5 text-center">
                        <p class="text-3xl font-black text-emerald-300">Java/C++</p>
                        <p class="mt-1 text-sm text-zinc-400">principal</p>
                    </div>
                    <div class="rounded-2xl bg-cyan-400/10 p-5 text-center">
                        <p class="text-3xl font-black text-cyan-300">POO</p>
                        <p class="mt-1 text-sm text-zinc-400">inter&eacute;s</p>
                    </div>
                    <div class="rounded-2xl bg-amber-300/10 p-5 text-center">
                        <p class="text-3xl font-black text-amber-200">Web</p>
                        <p class="mt-1 text-sm text-zinc-400">aprendiendo</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="contacto" class="mx-auto max-w-[92rem] px-6 pb-24">
            <div class="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-amber-300/10 p-8 md:p-12">
                <div class="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
                    <div>
                        <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Contacto</p>
                        <h2 class="text-4xl font-black tracking-tight">&iquest;Construimos algo?</h2>
                        <p class="mt-4 max-w-xl text-zinc-400">
                            Puedes escribirme para hablar de proyectos, pr&aacute;cticas, ideas o colaboraci&oacute;n.
                        </p>
                    </div>

                    <div class="grid gap-5 sm:grid-cols-2">
                        ${contacts.map(contactLink).join("")}
                    </div>
                </div>
            </div>
        </section>
    `;
}
