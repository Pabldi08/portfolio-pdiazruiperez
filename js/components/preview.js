export const accentClasses = {
    emerald: {
        border: "hover:border-emerald-400/60",
        text: "text-emerald-300",
        bg: "bg-emerald-400/10",
        button: "bg-emerald-400 text-zinc-950 hover:bg-emerald-300",
        ring: "border-emerald-400/25"
    },
    cyan: {
        border: "hover:border-cyan-400/60",
        text: "text-cyan-300",
        bg: "bg-cyan-400/10",
        button: "bg-cyan-300 text-zinc-950 hover:bg-cyan-200",
        ring: "border-cyan-400/25"
    },
    amber: {
        border: "hover:border-amber-300/60",
        text: "text-amber-200",
        bg: "bg-amber-300/10",
        button: "bg-amber-300 text-zinc-950 hover:bg-amber-200",
        ring: "border-amber-300/25"
    },
    rose: {
        border: "hover:border-rose-300/60",
        text: "text-rose-200",
        bg: "bg-rose-300/10",
        button: "bg-rose-300 text-zinc-950 hover:bg-rose-200",
        ring: "border-rose-300/25"
    }
};

export function getAccentClasses(accent) {
    return accentClasses[accent] ?? accentClasses.emerald;
}

export function renderPreview(project) {
    if (project.image?.src) {
        return `
            <div class="h-56 overflow-hidden border-b border-white/10 bg-zinc-950">
                <img src="${project.image.src}" alt="${project.image.alt ?? project.title}" class="h-full w-full object-cover object-center">
            </div>
        `;
    }

    const classes = getAccentClasses(project.accent);

    return `
        <div class="border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-5">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div class="flex items-center justify-between gap-3">
                    <span class="rounded-full ${classes.bg} px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${classes.text}">
                        Vista previa
                    </span>
                    <span class="text-xs font-semibold text-zinc-500">Sustituible por demo real</span>
                </div>

                <div class="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                    <div>
                        <p class="text-lg font-black text-white">${project.title}</p>
                        <p class="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                            Usa este bloque como placeholder comun para todos los proyectos o reemplazalo por una captura cuando tengas una demo visual.
                        </p>
                    </div>

                    <div class="grid h-24 grid-cols-3 gap-2">
                        <span class="rounded-xl bg-white/10"></span>
                        <span class="rounded-xl bg-white/20"></span>
                        <span class="rounded-xl bg-white/10"></span>
                        <span class="col-span-2 rounded-xl bg-white/10"></span>
                        <span class="rounded-xl ${classes.bg}"></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function tagList(project) {
    const classes = getAccentClasses(project.accent);

    return project.tags.map(tag => `
        <span class="rounded-full ${classes.bg} px-3 py-1 text-xs font-bold ${classes.text}">${tag}</span>
    `).join("");
}
