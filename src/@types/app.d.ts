import type {
    UserLanguage,
    ConfigName,
    HostServices
} from "@smals-belgium/myhealth-wc-integration";

class CommonSpecs extends HTMLElement {
    language: `${UserLanguage}`;
    configName: `${ConfigName}`;
    services: HostServices;
    professional: boolean;
    offlineDataStorageEnabled: boolean;
    isOfflineAuthenticated: boolean;
    ssin?: string;
}

class PrescriptionList extends CommonSpecs {}

export type Parameters = {
    language: `${UserLanguage}`;
    configName: `${ConfigName}`;
    services: HostServices;
    extraParams: {
        [x:string]: any
    }
}

class PrescriptionDetails extends CommonSpecs {
    rid: string;
}

class MedicationSchemeList extends CommonSpecs {}

class MedicationSchemeDetail extends CommonSpecs {
    id: string
}

class DiaryNote extends CommonSpecs {}

class DeliveredMedicationList extends CommonSpecs {}

class DeliveredMedicationDetail extends CommonSpecs {
    dguid: string;
}