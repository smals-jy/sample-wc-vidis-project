// Import JS
import "@smals-belgium-shared/vidis-prescription-detail"
// Import CSS
// import "@smals-belgium-shared/vidis-prescription-detail/prescription-detail.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { OpenEventDetail, PrescriptionDetails, Parameters } from "../@types/app";
import { setCommonComponentInputs } from "../component-inputs";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-prescription-detail") as PrescriptionDetails;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    setCommonComponentInputs(wc, params);

    // Specific input for this common
    // Here is a dummy place holder rid, to check what happens when prescription doesn't exist anymore
    wc.rid = params.extraParams.rid || "BEP000000000";

    wc.addEventListener("open", ((event: CustomEvent<OpenEventDetail>) => {
        const { componentTag, props } = event.detail;
        console.log("Open component:", componentTag, props);
    }) as EventListener)
    return wc;
}
