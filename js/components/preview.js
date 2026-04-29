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
    if (project.preview === "terminal") {
        return `
            <div class="bg-black p-5 font-mono text-sm">
                <div class="mb-5 flex gap-2">
                    <span class="h-3 w-3 rounded-full bg-red-500"></span>
                    <span class="h-3 w-3 rounded-full bg-yellow-500"></span>
                    <span class="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <p class="text-emerald-400">&gt; java -jar MarioGame.jar</p>
                <p class="mt-3 text-zinc-400">Initializing world...</p>
                <p class="mt-3 text-white">[M] [?] [M] &nbsp; ᕦ( ᐛ )ᕤ</p>
                <p class="text-white">___|____|____|___</p>
            </div>
        `;
    }

    const classes = getAccentClasses(project.accent);

    return `
        <div class="flex h-48 items-center justify-center border-b border-white/10 ${classes.bg}">
            <div class="grid h-28 w-44 grid-cols-3 gap-2">
                <span class="rounded bg-white/15"></span>
                <span class="rounded bg-white/25"></span>
                <span class="rounded bg-white/10"></span>
                <span class="col-span-2 rounded bg-white/10"></span>
                <span class="rounded bg-white/25"></span>
                <span class="rounded bg-white/20"></span>
                <span class="col-span-2 rounded bg-white/10"></span>
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
