// Import JS
import "@smals-belgium-shared/vidis-diarynote"
// Import CSS
// import "@smals-belgium-shared/vidis-diarynote/diarynote.css"
// TODO will be removed when VIDIS packages have built-in types (needed so I can review MAGS criteria)
import type { DiaryNote, Parameters } from "../@types/app";
import { setCommonComponentInputs } from "../component-inputs";

// To int the component
export default async function initModule(params : Parameters) {
    
    const wc = document.createElement("vidis-diarynote") as DiaryNote;

    // Common inputs for all VIDIS web components
    // Refer to https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration for more details
    setCommonComponentInputs(wc, params);

    return wc;
}
