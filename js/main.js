import { navigateTo, renderRoute, setProjectFilter } from "./router.js?v=36f8916eb4";
import { handleBooterClick, handleBooterKeydown, shouldShowBooter, startBooter, stopBooter } from "./components/booter.js?v=36f8916eb4";
import { closeConsolePanel, handleConsoleSubmit, openConsolePanel } from "./components/virtualConsole.js?v=36f8916eb4";

document.addEventListener("click", (event) => {
    if (handleBooterClick(event)) {
        return;
    }

    const internalLink = event.target.closest("a[href^='/']");
    if (internalLink && internalLink.origin === window.location.origin) {
        event.preventDefault();
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
    if (!consoleForm) return;

    event.preventDefault();

    const input = consoleForm.querySelector('input[name="command"]');
    const command = input?.value ?? "";

    handleConsoleSubmit(consoleForm.dataset.consoleForm, command);

    if (input) {
        input.value = "";
        input.focus();
    }
});

window.addEventListener("popstate", renderApp);
renderApp();

function renderApp() {
    if (shouldShowBooter()) {
        setShellVisible(false);
        startBooter();
        return;
    }

    stopBooter();
    setShellVisible(true);
    renderRoute();
}

function setShellVisible(visible) {
    document.querySelectorAll("[data-site-shell]").forEach(element => {
        element.hidden = !visible;
    });
}
