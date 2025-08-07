// Import JS
import "@smals-belgium-shared/vidis-delivered-medication-detail"
// Import CSS
import "@smals-belgium-shared/vidis-delivered-medication-detail/delivered-medication-detail.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { DeliveredMedicationDetail, Parameters } from "../@types/app";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-delivered-medication-detail") as DeliveredMedicationDetail;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    wc.language = params.language
    wc.configName = params.configName;
    wc.services = params.services;
    wc.professional = false;
    wc.offlineDataStorageEnabled = false;
    wc.isOfflineAuthenticated = false;
    wc.ssin = "12987654321";

    // Specific input for this common
    // Here is a dummy place holder dguid, to check what happens when delivered medication doesn't exist anymore
    wc.dguid = params.extraParams.dguid || "123";

    return wc;
}
