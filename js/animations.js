let observer = null;

export function setupScrollAnimations() {
    observer?.disconnect();

    const targets = [...document.querySelectorAll("#app section, #app article, #app header")];

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(el => {
        el.classList.add("reveal");

        // Stagger cards (articles) based on their position among siblings
        if (el.tagName === "ARTICLE") {
            const siblings = [...el.parentElement.querySelectorAll("article")];
            el.style.transitionDelay = `${siblings.indexOf(el) * 0.08}s`;
        }

        observer.observe(el);
    });
}
