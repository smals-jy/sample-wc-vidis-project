// Import JS
import "@smals-belgium-shared/vidis-prescription-list"
// Import CSS
import "@smals-belgium-shared/vidis-prescription-list/prescription-list.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { PrescriptionList, Parameters } from "../@types/app";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-prescription-list") as PrescriptionList;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    wc.language = params.language
    wc.configName = params.configName;
    wc.services = {
        cache: {
            get: () => (undefined),
            set: () => {},
            remove: () => {}
        } ,
        getAccessToken: async () => prompt("Your token here"),
        registerRefreshCallback: () => { }
    }

    wc.addEventListener("onSelectPrescription", (event) => {
        console.log(`event:`, event);
    })

    document.body.append(wc);
}