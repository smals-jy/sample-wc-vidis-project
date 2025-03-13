import "./style.css";
import type { Language, Configuration } from "@smals-belgium/myhealth-wc-integration";
import type { Parameters } from "../@types/app.d.ts";

// Types
type ComponentChoice = "prescriptions-list" | "prescriptions-detail" | "medication-scheme" | "diary-notes" | "delivered-medication-list" | "delivered-medication-detail";

// variables
const components : ComponentChoice[] = [
  "prescriptions-list", "medication-scheme", "diary-notes", "delivered-medication-list", "delivered-medication-detail" 
];
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

// Generate the form for end users
function generateForm() {
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
    await parseForm();
  });

  // Append elements
  container.appendChild(form);
  app.appendChild(container);
}

async function parseForm() {
  // Fields
  const component = (document.getElementById("component") as HTMLSelectElement).value as ComponentChoice;
  const language = (document.getElementById("language") as HTMLSelectElement).value as `${Language}`;
  const environment = (document.getElementById("environment") as HTMLSelectElement).value as `${Configuration}`;

  // Common params to all components
  let commonParams : Parameters = {
    configName: environment,
    language: language,
    services: {
      cache: {
          get: () => (undefined),
          set: () => {},
          remove: () => {}
      } ,
      getAccessToken: async () => prompt("Your VIDIS JWT token here"),
      registerRefreshCallback: () => { }
    }
  }

  console.log(`Loading ${component}`);
  console.log(commonParams);

  try {
    let wc : HTMLElement | null = null;
    const componentContainer = document.getElementById("playground");

    // Delete previous web component
    if (componentContainer) {
      while (componentContainer.firstChild) {
        componentContainer.removeChild(componentContainer.firstChild);
      }
    }

    // Dynamically import the corresponding module
    switch(component) {
      case "prescriptions-list":
        let module = (await import("../prescriptions-list/index.ts")).default;
        wc = await module(commonParams);
        break;
      case "prescriptions-detail":
      case "medication-scheme":
      case "diary-notes":
      case "delivered-medication-list":
      case "delivered-medication-detail":
      default:
        break
    }

    // Put the component here
    if (wc && componentContainer) {
      componentContainer.appendChild(wc);
    }

  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

// Generate the form
generateForm()