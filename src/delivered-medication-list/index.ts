// Import JS
import "@smals-belgium-shared/vidis-delivered-medication-list"
// Import CSS
// import "@smals-belgium-shared/vidis-delivered-medication-list/delivered-medication-list.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { DeliveredMedicationList, OpenEventDetail, Parameters } from "../@types/app";
import { setCommonComponentInputs } from "../component-inputs";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-delivered-medication-list") as DeliveredMedicationList;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    setCommonComponentInputs(wc, params);

    wc.addEventListener("open", ((event: CustomEvent<OpenEventDetail>) => {
        const { componentTag, props } = event.detail;
        console.log("Open component:", componentTag, props);
    }) as EventListener)

    return wc;
}
