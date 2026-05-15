export function stackCard(item) {
    return `
        <div class="group flex shrink-0 select-none flex-col items-center gap-3 px-10 py-2">
            <div class="flex h-16 w-16 items-center justify-center transition-all duration-300 ease-out [&>svg]:h-full [&>svg]:w-full group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.2)] opacity-70 group-hover:opacity-100">
                ${item.svg}
            </div>
            <span class="text-xs font-bold tracking-wide text-zinc-600 transition-colors duration-300 group-hover:text-zinc-300">${item.title}</span>
        </div>
    `;
}
