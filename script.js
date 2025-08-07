import data from "./info.json" with { type: "json" }; 

/* Manejo de menues para dispositivos moviles */

const TOGGLE_MENU = document.getElementById("toggle-menu");
const MENU = document.getElementById("navigation-list");

const TOGGLE_SOCIAL_BAR = document.getElementById("toggle-social-bar");
const SOCIAL_BAR = document.querySelector("aside.social-media-bar ul");

const toggleMenu = () => {
	MENU.style.right = MENU.style.right !== "1rem" ? "1rem" : "-100%";
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
		MENU.style.right = "-100%";
		TOGGLE_MENU.classList.add("bx-menu");
		TOGGLE_MENU.classList.remove("bx-x");
		SOCIAL_BAR.style.bottom = "initial";
	} else {
/* 		MENU.style.right = "-100%"; */
		SOCIAL_BAR.style.bottom = "-100%";
	}
});

function scrollToTop () {
	window.scrollTo({top: 0, behavior: "smooth"});
}

/* Obtencion de informacion para secciones secundarias */

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

function fillProjects () {
	let projectsList = data.projects
		.map((project) => {
			return `				
			<div class="project container">
				<div class="header">
					<img
						src="./assets/icons8-preguntas-de-los-medios-96.png"
						alt="La imagen"
					/>
					<h4 class="title">${project.title}</h4>
				</div>
				<div class="content">
					<p class="description">${project.description}</p>
					<p class="tools">Herramientas usadas: ${project.technologies.join(", ")}</p>
				</div>
				<div class="footer">
					<a class="button view-repo" target="_blank" href="${project.repositoryUrl}">Ver en GitHub</a>
					<a class="button visit-demo" target="_blank" href="${project.url}">Ver online</a>
				</div>
			</div>`;
		})
		.join("");
	document.getElementById("projects").innerHTML += projectsList;
}

// Scroll Reveal

function initScrollReveal () {
	const SR = ScrollReveal({
		reset: true,
		delay: 100,
		duration: 1000,
		distance: "100%",
	});
	
	SR.reveal("#hero-img", { origin: "right" });
	SR.reveal("#hero-text", { origin: "left" });
	SR.reveal("#tools", { origin: "left" });
	SR.reveal("#skills", { origin: "right" });
	SR.reveal(".project", { origin: "left" });
}

// Manejo de navegacion SPA

const ROUTES = [
	{
		hash: "home",
		sectionId: "hero",
	},
	{
		hash: "skills",
		sectionId: "tools-and-skills",
	},
	{
		hash: "projects",
		sectionId: "projects",
	}
]

function handleNavigate (hash) {
	document.querySelectorAll("section").forEach((sec)=>{sec.style.display="none"});
	console.log(hash);
	window.location = `#${hash}`;
	let newId = ROUTES.find((route) => route.hash === hash).sectionId;
	console.log(newId);
	document.getElementById(newId).style.display = "grid";
}

const initLocation = () => {
	let currentHash = window.location.hash;
	if (currentHash === "") {
		handleNavigate("home");
	} else {
		handleNavigate(currentHash);
	}
}

document.getElementById("home-link").addEventListener("click", () => {
	handleNavigate("home");
	scrollToTop();
});
document.getElementById("skills-link").addEventListener("click", () => {
	toggleMenu();
	handleNavigate("skills");
	scrollToTop();
});
document.getElementById("projects-link").addEventListener("click", () => {
	toggleMenu();
	handleNavigate("projects");
	scrollToTop();
});

document.addEventListener("DOMContentLoaded", fillSkills);
document.addEventListener("DOMContentLoaded", fillTools);
document.addEventListener("DOMContentLoaded", fillProjects);
/* document.addEventListener("DOMContentLoaded", initScrollReveal); */
document.addEventListener("DOMContentLoaded", initLocation);