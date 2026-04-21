import data from "./info.json" with { type: "json" };

const MILLISECONDS_IN_A_YEAR = 60 * 1000 * 60 * 24 * 365;

/* Manejo de menues para dispositivos moviles */

const TOGGLE_MENU = document.getElementById("toggle-menu");
const MENU = document.getElementById("navigation-list");

const TOGGLE_SOCIAL_BAR = document.getElementById("toggle-social-bar");
const SOCIAL_BAR = document.querySelector("aside.social-media-bar ul");

function calculateElapsedYears(initialDate) {
	return Math.floor(
		(Date.now() - new Date(initialDate).getTime()) / MILLISECONDS_IN_A_YEAR,
	);
}

const closeMenu = () => {
	if (!TOGGLE_MENU.classList.contains("bx-x")) {
		return;
	}
	MENU.style.right = "-100%";
	TOGGLE_MENU.classList.remove("bx-x");
	TOGGLE_MENU.classList.add("bx-menu");
};

const toggleMenu = () => {
	MENU.style.right = TOGGLE_MENU.classList.contains("bx-menu")
		? "1rem"
		: "-100%";
	TOGGLE_MENU.classList.toggle("bx-menu");
	TOGGLE_MENU.classList.toggle("bx-x");
};

TOGGLE_MENU.addEventListener("click", toggleMenu);

const closeSocialBar = () => {
	if (SOCIAL_BAR.style.bottom === "90px") {
		SOCIAL_BAR.style.bottom = "-100%";
	}
};

const toggleSocialBar = () => {
	SOCIAL_BAR.style.bottom =
		SOCIAL_BAR.style.bottom !== "90px" ? "90px" : "-100%";
};

TOGGLE_SOCIAL_BAR.addEventListener("click", toggleSocialBar);

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

// Manejar redimensionamiento de pantalla

window.addEventListener("resize", () => {
	closeMenu();
	closeSocialBar();
});

function fillPersonalData() {
	let fullName = `${data.name} ${data.surname}`;
	document.getElementById("full-name").innerText = fullName;
	document.getElementById("role-title").innerText = data.headline;

	let photo = document.querySelector("#hero-img img");
	photo.src = data.portfolioPicture;
	photo.alt = `${fullName} Photo`;

	let linkedInElement = document.getElementById("linkedin");
	linkedInElement.href = `https://www.linkedin.com/in/${data.contact.linkedin}/`;

	let gitHubElement = document.getElementById("github");
	gitHubElement.href = `https://github.com/${data.contact.github}/`;

	document.getElementById("online-cv").href = data.onlineResume;
}

function fillProfileSummary() {
	let profileSummary = data.profileSummary
		.map((paragraph) => {
			return paragraph;
		})
		.join(" ");
	profileSummary = profileSummary.replace(
		"TOTAL_EXPERIENCE",
		calculateElapsedYears(data.firstJobDate),
	);
	document.getElementById("profile").innerHTML = profileSummary;
}

/* Obtencion de informacion para secciones secundarias */

function fillTools() {
	data.toolCategories.forEach((category) => {
		let toolsList = data.tools
			.filter((tool) => tool.categoryId === category.id && !tool.hidden)
			.map((tool) => {
				return `<span class="skill">${tool.name}</span>`;
			})
			.join("&nbsp;");

		let categoryTools = document.createElement("p");
		categoryTools.innerHTML = `<div class="tool-category">${category.description}</div> ${toolsList}<br>`;

		document.getElementById("tools").appendChild(categoryTools);
	});
}

function fillProjects() {
	let projectsList = data.projects
		.filter((project) => !project.hidden)
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
					<a class="button view-repo" target="_blank" href="${
						project.repositoryUrl
					}">Ver en GitHub</a>
					${
						location.href.includes(project.url)
							? `<span class="button disabled">
							<span class="tooltip">Estas aqui</span>
							Ver online
						</span>`
							: `<a class="button visit-demo" target="_blank" href="${project.url}">Ver online</a>`
					}
				</div>
			</div>`;
		})
		.join("");
	document.getElementById("projects").innerHTML += projectsList;
}

// Manejo de navegacion SPA

const ROUTES = [
	{
		hash: "#home",
		title: "Inicio",
		sectionId: "hero",
		animatedChildren: [
			{
				selector: "#hero-img",
				origin: "right",
			},
			{
				selector: "#hero-text",
				origin: "left",
			},
		],
	},
	{
		hash: "#skills",
		title: "Herramientas y habilidades",
		sectionId: "tools-and-skills",
		animatedChildren: [
			{
				selector: "#tools",
				origin: "left",
			},
			{
				selector: "#skills",
				origin: "right",
			},
		],
	},
	{
		hash: "#projects",
		title: "Ultimos proyectos",
		sectionId: "projects",
		animatedChildren: [
			{
				selector: ".project",
				origin: "left",
			},
		],
	},
];

function handleNavigate(hash) {
	let oldSection = document.querySelector("section.visible");

	if (oldSection) {
		/* Oculto seccion anterior y elimino animaciones */
		oldSection.classList.remove("visible");
		let animatedElements = oldSection.querySelectorAll("[data-sr-id]");

		ScrollReveal().clean(animatedElements);
		// Fix para evitar parpadeo al volver a secciones ya visitadas
		animatedElements.forEach((elem) => {
			elem.attributes.removeNamedItem("style");
		});
	}

	window.location = hash;
	let newRoute = ROUTES.find((route) => route.hash === hash);
	document.getElementById(newRoute.sectionId).classList.add("visible");
	document.title = `${data.name} ${data.surname} | ${newRoute.title}`;

	newRoute.animatedChildren.forEach((child) => {
		ScrollReveal().reveal(child.selector, { origin: child.origin });
	});

	closeMenu();
	closeSocialBar();
	scrollToTop();
}

const initLocation = () => {
	let currentHash = window.location.hash;
	if (currentHash === "") {
		handleNavigate("#home");
	} else {
		handleNavigate(currentHash);
	}
};

document.getElementById("home-link").addEventListener("click", () => {
	handleNavigate("#home");
});
document.getElementById("skills-link").addEventListener("click", () => {
	handleNavigate("#skills");
});
document.getElementById("projects-link").addEventListener("click", () => {
	handleNavigate("#projects");
});

document.addEventListener("DOMContentLoaded", fillPersonalData);
document.addEventListener("DOMContentLoaded", fillProfileSummary);
document.addEventListener("DOMContentLoaded", fillTools);
document.addEventListener("DOMContentLoaded", fillProjects);
document.addEventListener("DOMContentLoaded", initLocation);
