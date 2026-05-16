import { contacts } from "../data/contacts.js?v=771f78e24b";
import { contactLink } from "../components/contactLink.js?v=771f78e24b";
import { t } from "../i18n.js?v=771f78e24b";

const WEB3FORMS_KEY = "a9118333-0c18-4ab0-95ee-b7cfd32591a5";

export function contactView() {
    return `
        <section class="mx-auto max-w-5xl px-6 py-20">
            <a href="/" class="mb-8 inline-flex text-sm font-bold text-zinc-400 transition hover:text-sky-300">${t("contact_back")}</a>

            <div class="mb-12">
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">${t("contact_label")}</p>
                <h1 class="text-5xl font-black tracking-tight md:text-6xl">${t("contact_title")}</h1>
                <p class="mt-4 max-w-xl text-lg leading-8 text-zinc-400">
                    ${t("contact_desc")}
                </p>
            </div>

            <div class="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-start">
                <div>
                    <p class="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-zinc-400">${t("contact_find_label")}</p>
                    <div class="flex flex-wrap gap-4">
                        ${contacts.map(contactLink).join("")}
                    </div>
                    <p class="mt-8 text-sm text-zinc-400">${t("contact_find_desc")}</p>
                </div>

                <div data-contact-wrapper class="rounded-2xl border border-white/10 bg-zinc-900/75 p-8 shadow-2xl shadow-black/30">
                    <form data-contact-form class="space-y-6" novalidate aria-label="${t("contact_label")}">
                        <input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">

                        <div>
                            <label for="contact-name" class="mb-2 block text-sm font-bold text-zinc-300">${t("contact_name")}</label>
                            <input type="text" id="contact-name" name="name" required autocomplete="name"
                                class="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-zinc-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/50">
                        </div>

                        <div>
                            <label for="contact-email" class="mb-2 block text-sm font-bold text-zinc-300">${t("contact_email")}</label>
                            <input type="email" id="contact-email" name="email" required autocomplete="email"
                                class="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-zinc-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/50">
                        </div>

                        <div>
                            <label for="contact-message" class="mb-2 block text-sm font-bold text-zinc-300">${t("contact_message")}</label>
                            <textarea id="contact-message" name="message" rows="5" required
                                class="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-zinc-500 transition focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/50"></textarea>
                        </div>

                        <div data-contact-idle>
                            <button type="submit"
                                class="w-full rounded-full bg-sky-400 px-7 py-3 font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-sky-300">
                                ${t("contact_submit")}
                            </button>
                        </div>

                        <div data-contact-loading hidden>
                            <button type="button" disabled aria-busy="true"
                                class="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-sky-400/50 px-7 py-3 font-bold text-zinc-950">
                                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                ${t("contact_sending")}
                            </button>
                        </div>

                        <div data-contact-error hidden>
                            <p class="rounded-xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm font-bold text-rose-300">
                                ${t("contact_error")}
                                <a href="mailto:diazruiperezpablo@gmail.com" class="underline hover:text-rose-200">diazruiperezpablo@gmail.com</a>.
                            </p>
                        </div>
                    </form>

                    <div data-contact-success hidden class="py-8 text-center" aria-live="polite">
                        <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                            <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h2 class="text-xl font-black text-white">${t("contact_success_title")}</h2>
                        <p class="mt-2 text-zinc-400">${t("contact_success_desc")}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export async function handleContactSubmit(form) {
    const wrapper = form.closest("[data-contact-wrapper]");
    const idleEl = form.querySelector("[data-contact-idle]");
    const loadingEl = form.querySelector("[data-contact-loading]");
    const errorEl = form.querySelector("[data-contact-error]");
    const successEl = wrapper?.querySelector("[data-contact-success]");

    const name = form.querySelector('[name="name"]')?.value.trim() ?? "";
    const email = form.querySelector('[name="email"]')?.value.trim() ?? "";
    const message = form.querySelector('[name="message"]')?.value.trim() ?? "";
    const botcheck = form.querySelector('[name="botcheck"]')?.checked ?? false;

    if (!form.reportValidity()) return;

    idleEl?.setAttribute("hidden", "");
    errorEl?.setAttribute("hidden", "");
    loadingEl?.removeAttribute("hidden");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                name,
                email,
                message,
                botcheck,
                subject: `Contacto portfolio: ${name}`,
                from_name: "Portfolio pdruiperez"
            })
        });

        const data = await response.json();

        if (data.success) {
            form.hidden = true;
            successEl?.removeAttribute("hidden");
        } else {
            throw new Error(data.message ?? "Error");
        }
    } catch {
        loadingEl?.setAttribute("hidden", "");
        idleEl?.removeAttribute("hidden");
        errorEl?.removeAttribute("hidden");
    }
}
