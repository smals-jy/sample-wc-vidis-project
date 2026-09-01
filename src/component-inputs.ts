import type { CommonSpecs, Parameters } from "./@types/app";

export function setCommonComponentInputs(wc: CommonSpecs, params: Parameters): void {
    wc.userLanguage = params.userLanguage;
    wc.configName = params.configName;
    wc.services = params.services;
    wc.authenticationStatus = params.authenticationStatus;
    wc.offlineDataStorageEnabled = params.offlineDataStorageEnabled;
    wc.professional = params.professional;
    wc.ssin = params.patientSsin;
}
