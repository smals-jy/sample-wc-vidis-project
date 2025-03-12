import "./style.css";

const components = ["prescriptions", "medication-scheme", "diary-notes", "delivered-medication"];
const languages = ["fr", "nl", "en", "de"];
const environments = ["ACC", "PROD"];

const app = document.getElementById("app") as HTMLDivElement;

// Create a container div
const container = document.createElement("div");
container.className = "container";

// Create logo
const logo = document.createElement("img");
logo.src = "https://play-lh.googleusercontent.com/6tKRItQiwMuPfunHUMOLlM12-QZR216951db8U5ork65yE_6wUC_-Ux8DaOLJdg-YA=w480-h960";
logo.className = "logo";
logo.alt = "App Logo";
container.appendChild(logo);

// Function to create dropdowns
const createDropdown = (label: string, options: string[], id: string) => {
  const div = document.createElement("div");
  div.innerHTML = `<label for="${id}">${label}:</label>`;
  const select = document.createElement("select");
  select.id = id;
  options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
  div.appendChild(select);
  return div;
};

// Create form
const form = document.createElement("form");
form.appendChild(createDropdown("Component", components, "component"));
form.appendChild(createDropdown("Language", languages, "language"));
form.appendChild(createDropdown("Environment", environments, "environment"));

const goButton = document.createElement("button");
goButton.textContent = "Go";
form.appendChild(goButton);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const component = (document.getElementById("component") as HTMLSelectElement).value;
  const language = (document.getElementById("language") as HTMLSelectElement).value;
  const environment = (document.getElementById("environment") as HTMLSelectElement).value;

  console.log(`Loading ${component}-list with lang=${language} and env=${environment}`);

  try {
    // Dynamically import the corresponding module
    const module = await import(`../${component}-list/index.ts`);
    if (module.init) {
      module.init({ language, environment });
    }
  } catch (error) {
    console.error("Failed to load module:", error);
  }
});

// Append elements
container.appendChild(form);
app.appendChild(container);