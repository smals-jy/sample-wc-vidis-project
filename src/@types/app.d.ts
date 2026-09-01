import type {
    UserLanguage,
    ConfigName,
    HostServices
} from "@smals-belgium/myhealth-wc-integration";

class CommonSpecs extends HTMLElement {
    userLanguage: `${UserLanguage}`;
    configName: `${ConfigName}`;
    services: HostServices;
    professional: boolean;
    offlineDataStorageEnabled: boolean;
    ssin?: string;
    authenticationStatus: "unauthenticated" | "online-authenticated" | "offline-authenticated";
}

export type OpenEventDetail = {
    componentTag: string;
    props?: {
        [key: string]: unknown;
    };
}

class PrescriptionList extends CommonSpecs {}

export type Parameters = {
    userLanguage: `${UserLanguage}`;
    configName: `${ConfigName}`;
    services: HostServices;
    authenticationStatus: "unauthenticated" | "online-authenticated" | "offline-authenticated";
    patientSsin: string;
    professional: boolean;
    offlineDataStorageEnabled: boolean;
    exchangeClientId: string;
    extraParams: {
        [x:string]: any
    }
}

class PrescriptionDetails extends CommonSpecs {
    rid: string;
}

class MedicationSchemeList extends CommonSpecs {
    exchangeClientId: string;
}

class MedicationSchemeDetail extends CommonSpecs {
    detail: {
        id: string;
        date?: string;
    };
}

class DiaryNote extends CommonSpecs {}

class DeliveredMedicationList extends CommonSpecs {}

class DeliveredMedicationDetail extends CommonSpecs {
    dguid: string;
}
