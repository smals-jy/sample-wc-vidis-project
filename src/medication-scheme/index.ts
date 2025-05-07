/*
// Import JS
import "@smals-belgium-shared/vidis-medication-scheme"
// Import CSS
import "@smals-belgium-shared/vidis-medication-scheme/medication-scheme.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { MedicationScheme, Parameters } from "../@types/app";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-medication-scheme") as MedicationScheme;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    wc.language = params.language
    wc.configName = params.configName;
    wc.services = params.services;

    return wc;
}
*/
