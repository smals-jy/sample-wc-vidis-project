// Import JS
import "@smals-belgium-shared/vidis-delivered-medication-list"
// Import CSS
import "@smals-belgium-shared/vidis-delivered-medication-list/delivered-medication-list.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { DeliveredMedicationList, Parameters } from "../@types/app";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-delivered-medication-list") as DeliveredMedicationList;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    wc.language = params.language
    wc.configName = params.configName;
    wc.services = params.services;
    wc.professional = false;
    wc.offlineDataStorageEnabled = false;
    wc.isOfflineAuthenticated = false;
    wc.ssin = "12987654321";

    wc.addEventListener("onSelectMedication", (event) => {
        console.log(`event:`, event);
    })

    return wc;
}
