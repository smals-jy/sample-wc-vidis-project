import "./style.css";
import { ConfigName } from "@smals-belgium/myhealth-wc-integration";
import type { AccessToken, UserLanguage } from "@smals-belgium/myhealth-wc-integration";
import type { Parameters, CommonSpecs } from "../@types/app.d.ts";
import { getAuthenticationContext } from "../authentication-context";
import { parseExtraParams } from "../extra-params";

// Types
type ComponentChoice = "prescriptions-list" | "prescriptions-detail" | "medication-scheme-list" | "medication-scheme-detail" | "diary-notes" | "delivered-medication-list" | "delivered-medication-detail";

// variables
const components: ComponentChoice[] = [
    "prescriptions-list",
    "prescriptions-detail",
    "medication-scheme-list",
    "medication-scheme-detail",
    "diary-notes",
    "delivered-medication-list",
    "delivered-medication-detail"
];
const languages = ["fr", "nl", "en", "de"];
const environments = ["ACC", "PROD", "DEMO", "DEV"];

const app = document.getElementById("app") as HTMLDivElement;

// Create a container div
const container = document.createElement("div");
container.className = "container";

// Create logo
const logo = document.createElement("img");
logo.src = "https://smals-jy.github.io/sample-wc-vidis-project/logo.png";
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

    const patientSsinDiv = document.createElement("div");
    patientSsinDiv.innerHTML = `<label for="patientSsin">Patient SSIN:</label>`;
    const patientSsinInput = document.createElement("input");
    patientSsinInput.id = "patientSsin";
    patientSsinInput.type = "text";
    patientSsinInput.required = true;
    patientSsinDiv.appendChild(patientSsinInput);
    form.appendChild(patientSsinDiv);

    // Add input for extra parameters
    const extraParamsDiv = document.createElement("div");
    extraParamsDiv.innerHTML = `<label for="extraParams">Extra Parameters (JSON Object):</label>`;
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
            case "medication-scheme-detail":
                extraParamsTextArea.value = `{ "id": "123", "date": "2026-01-01" }`;
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
    const language = (document.getElementById("language") as HTMLSelectElement).value as `${UserLanguage}`;
    const patientSsin = (document.getElementById("patientSsin") as HTMLInputElement).value;

    // Read raw environment string from the select
    const envRaw = (document.getElementById("environment") as HTMLSelectElement).value;

    // Validate and coerce to ConfigName. If invalid, fallback to ConfigName.DEV
    const environment = ((Object.values(ConfigName) as string[]).includes(envRaw) ? envRaw as ConfigName : ConfigName.DEV);

    // Determine authentication status based on environment
    // Default to "online-authenticated", except for DEMO mode
    const authenticationStatus = environment === ConfigName.DEMO ? "offline-authenticated" : "online-authenticated";
    
    const token = prompt("Your VIDIS JWT token here") || "";
    const extraParamsString = (document.getElementById("extraParams") as HTMLTextAreaElement).value;

    // Parse extra parameters (with security considerations)
    let extraParams: Record<string, unknown>;
    try {
        extraParams = parseExtraParams(extraParamsString);
    } catch {
        alert("Invalid extra parameters. Please enter a valid JSON object.");
        return;
    }

    const authenticationContext = getAuthenticationContext(token);

    // Common params to all components
    let commonParams: Parameters = {
        configName: environment,
        userLanguage: language,
        authenticationStatus: authenticationStatus,
        patientSsin,
        professional: authenticationContext.professional,
        offlineDataStorageEnabled: false,
        exchangeClientId: "nihdi-vidis-webcomponent",
        services: {
            cacheDataStorage: new Map<string, unknown>(),
            offlineDataStorage: {
                get: async () => null,
                set: async () => { },
                delete: async () => { }
            },
            events: {
                addEventListener: () => { },
                removeEventListener: () => { }
            },
            getAccessToken: async () => {
                return token as AccessToken;
            },
            getIdToken: async () => {
                return Promise.reject("Not relevant for this")
            },
            patchContactInfo: () => []
        },
        // Merge extra parameters
        extraParams: extraParams
    };

    console.log(`Loading ${component}`);
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
                module = (await import("../prescriptions-list")).default;
                wc = await module(commonParams);
                break;
            case "prescriptions-detail":
                module = (await import("../prescription-detail")).default;
                wc = await module(commonParams);
                break;
            case "medication-scheme-list":
                module = (await import("../medication-scheme-list")).default;
                wc = await module(commonParams);
                break;
            case "medication-scheme-detail":
                module = (await import("../medication-scheme-detail")).default;
                wc = await module(commonParams);
                break;
            case "diary-notes":
                module = (await import("../diary-notes")).default;
                wc = await module(commonParams);
                break;
            case "delivered-medication-list":
                module = (await import("../delivered-medication-list")).default;
                wc = await module(commonParams);
                break;
            case "delivered-medication-detail":
                module = (await import("../delivered-medication-detail")).default;
                wc = await module(commonParams);
                break;
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
