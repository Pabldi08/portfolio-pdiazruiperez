import { iconGitHub, iconLinkedIn, iconMail, iconPhone } from "./icons.js";

const icons = {
    github: iconGitHub,
    linkedin: iconLinkedIn,
    mail: iconMail,
    phone: iconPhone
};

export function contactLink(contact) {
    const icon = icons[contact.icon]?.() ?? "";

    return `
        <a href="${contact.href}" target="${externalTarget(contact.href)}" rel="noreferrer"
            class="group flex min-h-32 items-center gap-5 rounded-2xl border border-white/10 bg-zinc-950/70 p-7 text-left transition hover:-translate-y-1 hover:border-emerald-400/50">
            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 transition group-hover:bg-emerald-400 group-hover:text-zinc-950">
                ${icon}
            </span>
            <span class="min-w-0">
                <span class="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">${contact.type}</span>
                <span class="contact-label mt-2 block text-base font-bold leading-6 text-zinc-100 lg:text-[1.05rem] xl:text-lg">${contact.label}</span>
            </span>
        </a>
    `;
}

function externalTarget(href) {
    return href.startsWith("http") ? "_blank" : "_self";
}
