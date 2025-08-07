// Import JS
import "@smals-belgium-shared/vidis-medication-scheme-detail"
// Import CSS
import "@smals-belgium-shared/vidis-medication-scheme-detail/medication-scheme-detail.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { MedicationSchemeDetail, Parameters } from "../@types/app";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-medication-scheme-detail") as MedicationSchemeDetail;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    wc.language = params.language
    wc.configName = params.configName;
    wc.services = params.services;
    wc.professional = false;
    wc.offlineDataStorageEnabled = false;
    wc.isOfflineAuthenticated = false;
    wc.ssin = undefined;

    // Specific input for this common
    // Here is a dummy place holder id, to check what happens when medication list item doesn't exist anymore
    wc.id = params.extraParams.id || "123";
  
    return wc;
}
