import "./style.css";
import type { Language, Configuration } from "@smals-belgium/myhealth-wc-integration";
import type { Parameters, CommonSpecs } from "../@types/app.d.ts";

// Types
type ComponentChoice = "prescriptions-list" | "prescriptions-detail" | "medication-scheme" | "diary-notes" | "delivered-medication-list" | "delivered-medication-detail";

// variables
const components: ComponentChoice[] = [
    "prescriptions-list",
    "prescriptions-detail",
    "medication-scheme",
    "diary-notes",
    "delivered-medication-list",
    "delivered-medication-detail"
];
const languages = ["fr", "nl", "en", "de"];
const environments = ["ACC", "PROD"];

const app = document.getElementById("app") as HTMLDivElement;

// Create a container div
const container = document.createElement("div");
container.className = "container";

// Create logo
const logo = document.createElement("img");
logo.src = "/logo.png";
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

    // Add input for extra parameters
    const extraParamsDiv = document.createElement("div");
    extraParamsDiv.innerHTML = `<label for="extraParams">Extra Parameters (JS Object):</label>`;
    const extraParamsInput = document.createElement("textarea");
    extraParamsInput.id = "extraParams";
    extraParamsInput.value = "{}"; // Default value
    extraParamsInput.style.width = "100%";
    extraParamsDiv.appendChild(extraParamsInput);
    form.appendChild(extraParamsDiv);

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

    // Add event listener to component dropdown
    const componentSelect = document.getElementById("component") as HTMLSelectElement;
    const extraParamsTextArea = document.getElementById("extraParams") as HTMLTextAreaElement;

    componentSelect.addEventListener("change", () => {
        const selectedComponent = componentSelect.value as ComponentChoice;
        switch (selectedComponent) {
            case "prescriptions-detail":
                extraParamsTextArea.value = `{ "rid": "BEP000000000" }`;
                break;
            case "delivered-medication-detail":
                extraParamsTextArea.value = `{ "dguid": "123" }`;
                break;
            default:
                extraParamsTextArea.value = "{}";
                break;
        }
    });
}

async function parseForm() {
    // Fields
    const component = (document.getElementById("component") as HTMLSelectElement).value as ComponentChoice;
    const language = (document.getElementById("language") as HTMLSelectElement).value as `${Language}`;
    const environment = (document.getElementById("environment") as HTMLSelectElement).value as `${Configuration}`;
    let token = prompt("Your VIDIS JWT token here");
    let extraParamsString = (document.getElementById("extraParams") as HTMLTextAreaElement).value;

    // Parse extra parameters (with security considerations)
    let extraParams: any = {};
    try {
        // Use a restricted sandbox-like approach.
        extraParams = (new Function(`"use strict"; return (${extraParamsString})`))();
        if (typeof extraParams !== 'object' || extraParams === null) {
            extraParams = {}; // Reset if not an object.
            console.warn("Extra parameters were not a valid object. Reset to empty object.");
        }
    } catch (error) {
        console.error("Error parsing extra parameters:", error);
        alert("Invalid extra parameters. Please enter a valid JavaScript object.");
        extraParams = {}; // Reset on error
    }

    // Common params to all components
    let commonParams: Parameters = {
        configName: environment,
        language: language,
        services: {
            cache: {
                get: () => (undefined),
                set: () => { },
                remove: () => { }
            },
            getAccessToken: async () => token,
            registerRefreshCallback: () => { }
        },
        // Merge extra parameters
        extraParams: extraParams
    };

    console.log(`Loading ${component}`);
    console.log(commonParams);

    try {
        let wc: HTMLElement | null = null;
        let module : (params: Parameters) => Promise<CommonSpecs>;
        const componentContainer = document.getElementById("playground");

        // Delete previous web component
        if (componentContainer) {
            while (componentContainer.firstChild) {
                componentContainer.removeChild(componentContainer.firstChild);
            }
        }

        // Dynamically import the corresponding module
        switch (component) {
            case "prescriptions-list":
                module = (await import("../prescriptions-list/index.ts")).default;
                wc = await module(commonParams);
                break;
            case "prescriptions-detail":
                module = (await import("../prescription-detail/index.ts")).default;
                wc = await module(commonParams);
                break;
            case "medication-scheme":
            case "diary-notes":
            case "delivered-medication-list":
            case "delivered-medication-detail":
            default:
                break;
        }

        // Put the component here
        if (wc && componentContainer) {
            componentContainer.appendChild(wc);
            document.getElementById('app')?.remove();
        }

    } catch (error) {
        console.error("Failed to load module:", error);
    }
}

// Generate the form
generateForm();