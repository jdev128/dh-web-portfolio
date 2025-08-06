import data from "./info.json" with { type: "json" }; 

const TOGGLE_MENU = document.getElementById("toggle-menu");
const MENU = document.getElementById("navigation-list");

const TOGGLE_SOCIAL_BAR = document.getElementById("toggle-social-bar");
const SOCIAL_BAR = document.querySelector("aside.social-media-bar ul");

const toggleMenu = () => {
	MENU.style.right = MENU.style.right !== "10px" ? "10px" : "-100%";
	TOGGLE_MENU.classList.toggle("bx-menu");
	TOGGLE_MENU.classList.toggle("bx-x");
};
TOGGLE_MENU.addEventListener("click", toggleMenu);

const toggleSocialBar = () => {
	SOCIAL_BAR.style.bottom =
		SOCIAL_BAR.style.bottom !== "90px" ? "90px" : "-100%";
};
TOGGLE_SOCIAL_BAR.addEventListener("click", toggleSocialBar);

window.addEventListener("resize", () => {
	if (window.innerWidth > 720) {
		MENU.style.right = "initial";
		TOGGLE_MENU.classList.add("bx-menu");
		TOGGLE_MENU.classList.remove("bx-x");
		SOCIAL_BAR.style.bottom = "initial";
	} else {
		MENU.style.right = "-100%";
		SOCIAL_BAR.style.bottom = "-100%";
	}
});

// Scroll Reveal

const SR = ScrollReveal({
	reset: true,
	delay: 100,
	duration: 1000,
	distance: "100%",
});

SR.reveal(".hero-img", { origin: "right" });
SR.reveal(".hero-text", { origin: "left" });

function fillTools() {
	let toolsList = data.tools
		.map((tool) => {
			return `<span class="pill">${tool.name}</span>`;
		})
		.join("");
	document.getElementById("tools").innerHTML += toolsList;
}

function fillSkills() {
	let skillsList = data.skills
		.map((skill) => {
			return `<span class="pill">${
				skill[0].toUpperCase() + skill.slice(1)
			}</span>`;
		})
		.join("");
	document.getElementById("skills").innerHTML += skillsList;
}

document.addEventListener("DOMContentLoaded", fillSkills);
document.addEventListener("DOMContentLoaded", fillTools);