// Import JS
import "@smals-belgium-shared/vidis-prescription-list"
// Import CSS
import "@smals-belgium-shared/vidis-prescription-list/prescription-list.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { PrescriptionList } from "../@types/app";

const wc = document.createElement("vidis-prescription-list") as PrescriptionList;

// Common inputs for all VIDIS web components
// Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
wc.language = 'en'
wc.configName = 'acc';
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
