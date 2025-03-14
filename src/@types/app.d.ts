import type {
    Language,
    Configuration,
    ComponentServices
} from "@smals-belgium/myhealth-wc-integration";

class CommonSpecs extends HTMLElement {
    language: `${Language}`;
    configName: `${Configuration}`;
    services: ComponentServices;
}

class PrescriptionList extends CommonSpecs {}

export type Parameters = {
    language: `${Language}`;
    configName: `${Configuration}`;
    services: ComponentServices;
    extraParams: {
        [x:string]: any
    }
}

class PrescriptionDetails extends CommonSpecs {
    rid: string;
}

class MedicationScheme extends CommonSpecs {}

class DiaryNote extends CommonSpecs {}

class DeliveredMedicationList extends CommonSpecs {}

class DeliveredMedicationDetail extends CommonSpecs {
    dguid: string;
}