// Add new boot entries here to extend the menu without touching the render logic.
const bootOptions = [
    {
        id: "portfolio",
        label: "Portfolio",
        description: "Entraras en la pagina principal con proyectos destacados, CV, stack tecnico y enlaces de contacto.",
        path: "/"
    },
    {
        id: "projects",
        label: "Projects",
        description: "Iras directamente al listado completo de proyectos para revisar codigo, tecnologias usadas y detalles de cada entrega.",
        path: "/proyectos"
    }
];

let selectedOptionIndex = 0;
let active = false;

export function shouldShowBooter() {
    return window.location.pathname === "/" && window.history.state?.booted !== true;
}

export function startBooter() {
    active = true;
    selectedOptionIndex = 0;
    renderBooter();
}

export function stopBooter() {
    active = false;
}

export function handleBooterClick(event) {
    if (!active) return false;

    const option = event.target.closest("[data-boot-option]");
    if (!option) return false;

    activateBootOption(option.dataset.bootOption);
    return true;
}

export function handleBooterKeydown(event) {
    if (!active) return false;

    if (event.key === "ArrowDown") {
        event.preventDefault();
        selectedOptionIndex = (selectedOptionIndex + 1) % bootOptions.length;
        renderBooter();
        return true;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        selectedOptionIndex = (selectedOptionIndex - 1 + bootOptions.length) % bootOptions.length;
        renderBooter();
        return true;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        activateBootOption(bootOptions[selectedOptionIndex].id);
        return true;
    }

    return false;
}

function activateBootOption(optionId) {
    const option = bootOptions.find(item => item.id === optionId) ?? bootOptions[0];
    stopBooter();
    window.history.replaceState({ booted: true }, "", option.path);
    window.dispatchEvent(new Event("popstate"));
}

function renderBooter() {
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = booterView();
    app.querySelector(`[data-boot-option="${bootOptions[selectedOptionIndex].id}"]`)?.focus({ preventScroll: true });
}

function booterView() {
    const selectedOption = bootOptions[selectedOptionIndex];

    return `
        <section class="min-h-screen bg-[#050506] px-4 py-6 font-mono text-zinc-100 sm:px-8" aria-labelledby="boot-title">
            <div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
                <header class="grid gap-4 text-sm font-black sm:grid-cols-[1fr_auto_1fr] sm:items-start">
                    <p class="tracking-wide text-zinc-300"><span class="text-emerald-400">ARROWS</span> Select&nbsp;&nbsp;&nbsp; <span class="text-emerald-400">ENTER</span> Boot</p>
                    <h1 id="boot-title" class="text-center text-base text-emerald-400">pdruiperez Bootloader</h1>
                    <p class="text-left tracking-wide text-zinc-300 sm:text-right"><span class="text-emerald-400">B</span> Blank Entry</p>
                </header>

                <div class="flex flex-1 flex-col items-center justify-center py-12">
                    <pre class="mx-auto mb-12 w-fit max-w-full overflow-x-auto whitespace-pre text-left text-xs leading-[0.68] text-emerald-400 sm:text-sm" aria-label="Logo provisional en ASCII">${asciiLogo()}</pre>

                    <div class="w-full max-w-2xl text-center">
                        <div class="mx-auto max-w-md text-left" role="listbox" aria-label="Opciones de arranque">
                            ${bootOptions.map((option, index) => bootOption(option, index)).join("")}
                        </div>

                        <div class="mx-auto mt-8 max-w-xl text-left">
                            <p class="text-sm font-black text-cyan-300">Descripcion de la seleccion</p>
                            <p class="mt-2 text-sm leading-6 text-zinc-300">${selectedOption.description}</p>
                        </div>
                    </div>
                </div>

                <footer class="pb-2 text-center text-sm text-zinc-400" role="status" aria-live="polite">
                    Seleccione una entrada y pulse <span class="font-black text-emerald-300">Enter</span> para arrancar.
                    <span class="sr-only">Use flecha arriba, flecha abajo y Enter para seleccionar.</span>
                </footer>
            </div>
        </section>
    `;
}

function bootOption(option, index) {
    const selected = index === selectedOptionIndex;
    const activeClasses = selected
        ? "bg-emerald-400 text-zinc-950"
        : "text-zinc-200 hover:bg-white/10 hover:text-emerald-300";

    return `
        <button type="button"
            class="block w-full px-3 py-1 text-left text-lg font-black leading-7 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${activeClasses}"
            data-boot-option="${option.id}"
            role="option"
            aria-selected="${selected}">
            <span aria-hidden="true">${selected ? "|->" : "|  "}</span> ${option.label}
        </button>
    `;
}


function asciiLogo() {
    return String.raw`██████  █████  █████  ██      ████      █████
██   ██ ██  ██ ██  ██ ██     ██  ██     ██  ██
██   ██ ██  ██ ██  ██ ██     ██  ██     ██  ██
██████  ██████ █████  ██     ██  ██     ██  ██
██      ██  ██ ██  ██ ██     ██  ██     ██  ██
██      ██  ██ ██  ██ ██     ██  ██     ██  ██
██      ██  ██ █████  ██████  ████      █████  ██`;
}
