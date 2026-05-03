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
    const classes = getAccentClasses(project.accent);

    return `
        <div class="h-56 overflow-hidden border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6">
            <div class="flex h-full items-end justify-between gap-5">
                <div class="grid h-full flex-1 grid-cols-4 gap-3 opacity-90">
                    <span class="rounded-xl bg-white/[0.04]"></span>
                    <span class="rounded-xl ${classes.bg}"></span>
                    <span class="rounded-xl bg-white/[0.06]"></span>
                    <span class="rounded-xl bg-white/[0.03]"></span>
                    <span class="col-span-2 rounded-xl bg-white/[0.06]"></span>
                    <span class="rounded-xl bg-white/[0.03]"></span>
                    <span class="rounded-xl ${classes.bg}"></span>
                    <span class="rounded-xl bg-white/[0.03]"></span>
                    <span class="rounded-xl bg-white/[0.06]"></span>
                    <span class="col-span-2 rounded-xl bg-white/[0.04]"></span>
                </div>

                <div class="flex h-full w-24 flex-col justify-end gap-3">
                    <span class="h-20 rounded-2xl ${classes.bg}"></span>
                    <span class="h-10 rounded-2xl bg-white/[0.08]"></span>
                    <span class="h-6 rounded-2xl bg-white/[0.04]"></span>
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

