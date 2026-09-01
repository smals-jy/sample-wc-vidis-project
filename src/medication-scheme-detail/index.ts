// Import JS
import "@smals-belgium-shared/vidis-medication-scheme-detail"
// Import CSS
//import "@smals-belgium-shared/vidis-medication-scheme-detail/medication-scheme-detail.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { MedicationSchemeDetail, Parameters } from "../@types/app";
import { setCommonComponentInputs } from "../component-inputs";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-medication-scheme-detail") as MedicationSchemeDetail;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    setCommonComponentInputs(wc, params);

    // Specific input for this common
    // Here is a dummy place holder id, to check what happens when medication list item doesn't exist anymore
    const id = typeof params.extraParams.id === "string" && params.extraParams.id.trim()
        ? params.extraParams.id
        : "123";
    const date = typeof params.extraParams.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(params.extraParams.date)
        ? params.extraParams.date
        : undefined;
    wc.detail = date ? { id, date } : { id };
  
    return wc;
}
