import type {
    Language,
    Configuration,
    ComponentServices
} from "@smals-belgium/myhealth-wc-integration";

class PrescriptionList extends HTMLElement {
    language: `${Language}`;
    configName: `${Configuration}`;
    services: ComponentServices;
}

export type Parameters = {
    language: `${Language}`;
    configName: `${Configuration}`;
}