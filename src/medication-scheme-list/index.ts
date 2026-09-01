// Import JS
import "@smals-belgium-shared/vidis-medication-scheme-list"
// Import CSS
// import "@smals-belgium-shared/vidis-medication-scheme-list/medication-scheme-list.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { MedicationSchemeList, Parameters } from "../@types/app";
import { setCommonComponentInputs } from "../component-inputs";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-medication-scheme-list") as MedicationSchemeList;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    setCommonComponentInputs(wc, params);
    wc.exchangeClientId = params.exchangeClientId;

    return wc;
}
