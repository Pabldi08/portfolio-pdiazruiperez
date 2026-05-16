import { navigateTo, renderRoute, setProjectFilter } from "./router.js?v=771f78e24b";
import { handleBooterClick, handleBooterKeydown, shouldShowBooter, startBooter, stopBooter } from "./components/booter.js?v=771f78e24b";
import { closeConsolePanel, handleConsoleSubmit, openConsolePanel } from "./components/virtualConsole.js?v=771f78e24b";
import { handleContactSubmit } from "./views/contactView.js?v=771f78e24b";
import { applyI18nToStatic, getLang, setLang } from "./i18n.js?v=771f78e24b";

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    mobileMenuBtn?.querySelector(".icon-menu")?.classList.remove("hidden");
    mobileMenuBtn?.querySelector(".icon-close")?.classList.add("hidden");
}

mobileMenuBtn?.addEventListener("click", () => {
    const willOpen = mobileMenu.hidden;
    mobileMenu.hidden = !willOpen;
    mobileMenuBtn.setAttribute("aria-expanded", String(willOpen));
    mobileMenuBtn.querySelector(".icon-menu").classList.toggle("hidden", willOpen);
    mobileMenuBtn.querySelector(".icon-close").classList.toggle("hidden", !willOpen);
});

document.addEventListener("click", (event) => {
    if (handleBooterClick(event)) {
        return;
    }

    const langToggle = event.target.closest("[data-lang-toggle]");
    if (langToggle) {
        setLang(getLang() === "es" ? "en" : "es");
        closeMobileMenu();
        renderRoute();
        applyI18nToStatic();
        return;
    }

    const internalLink = event.target.closest("a[href^='/']");
    if (internalLink && internalLink.origin === window.location.origin) {
        event.preventDefault();
        closeMobileMenu();
        navigateTo(internalLink.pathname);
        return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
        setProjectFilter(filterButton.dataset.filter);
        return;
    }

    const openConsoleButton = event.target.closest("[data-open-console]");
    if (openConsoleButton) {
        openConsolePanel(openConsoleButton.dataset.openConsole);
        return;
    }

    const closeConsoleButton = event.target.closest("[data-close-console]");
    if (closeConsoleButton) {
        closeConsolePanel(closeConsoleButton.dataset.closeConsole);
    }
});

document.addEventListener("keydown", (event) => {
    handleBooterKeydown(event);
});

document.addEventListener("submit", (event) => {
    const consoleForm = event.target.closest("[data-console-form]");
    if (consoleForm) {
        event.preventDefault();
        const input = consoleForm.querySelector('input[name="command"]');
        const command = input?.value ?? "";
        handleConsoleSubmit(consoleForm.dataset.consoleForm, command);
        if (input) {
            input.value = "";
            input.focus();
        }
        return;
    }

    const contactForm = event.target.closest("[data-contact-form]");
    if (contactForm) {
        event.preventDefault();
        handleContactSubmit(contactForm);
    }
});

window.addEventListener("popstate", renderApp);
applyI18nToStatic();
renderApp();

function renderApp() {
    closeMobileMenu();

    if (shouldShowBooter()) {
        setShellVisible(false);
        startBooter();
        applyI18nToStatic();
        return;
    }

    stopBooter();
    setShellVisible(true);
    renderRoute();
    applyI18nToStatic();
}

function setShellVisible(visible) {
    document.querySelectorAll("[data-site-shell]").forEach(element => {
        element.hidden = !visible;
    });
}
