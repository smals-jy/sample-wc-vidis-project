import assert from "node:assert/strict";
import test from "node:test";
import type { CommonSpecs, Parameters } from "./@types/app";
import { setCommonComponentInputs } from "./component-inputs";

test("passes the patient SSIN without substituting professional token data", () => {
    const component = {} as CommonSpecs;
    const params = {
        patientSsin: "patient-ssin",
        professional: true,
        userLanguage: "en",
        configName: "DEV",
        services: {},
        authenticationStatus: "online-authenticated",
        offlineDataStorageEnabled: false,
        exchangeClientId: "client-id",
        extraParams: {}
    } as unknown as Parameters;

    setCommonComponentInputs(component, params);

    assert.equal(component.professional, true);
    assert.equal(component.ssin, "patient-ssin");
    assert.equal("isOfflineAuthenticated" in component, false);
});
