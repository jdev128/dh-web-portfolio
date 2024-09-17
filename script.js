const TOGGLE_MENU = document.getElementById("toggle-menu");
const MENU = document.getElementById("navigation-list");
TOGGLE_MENU.addEventListener("click", () => {
    MENU.style.right = MENU.style.right !== "10px" ? "10px" : "-100%";
    TOGGLE_MENU.classList.toggle("bx-menu");
    TOGGLE_MENU.classList.toggle("bx-x");
})

const TOGGLE_SOCIAL_BAR = document.getElementById("toggle-social-bar");
const SOCIAL_BAR = document.querySelector("aside.social-media-bar ul");
TOGGLE_SOCIAL_BAR.addEventListener("click", () => {
    SOCIAL_BAR.style.bottom = SOCIAL_BAR.style.bottom !== "90px" ? "90px" : "-100%";
});

const SR = ScrollReveal({
    reset: true,
    delay: 100,
    duration: 1000,
    distance: "100%"
});

SR.reveal(".hero-img", {origin: "right"});
SR.reveal(".hero-text", {origin: "left"});