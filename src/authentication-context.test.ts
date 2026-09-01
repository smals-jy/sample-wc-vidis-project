import assert from "node:assert/strict";
import test from "node:test";
import { getAuthenticationContext, parseJwtPayload } from "./authentication-context";

function createToken(payload: unknown): string {
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
    return `header.${encoded}.signature`;
}

test("parses a JWT payload segment", () => {
    assert.deepEqual(parseJwtPayload(createToken({ subject: "example" })), { subject: "example" });
});

test("detects a professional from a non-empty userProfile SSIN", () => {
    assert.deepEqual(
        getAuthenticationContext(createToken({ userProfile: { ssin: "professional-ssin" } })),
        { professional: true }
    );
});

test("does not detect a professional for missing or invalid SSIN claims", () => {
    assert.equal(getAuthenticationContext(createToken({})).professional, false);
    assert.equal(getAuthenticationContext(createToken({ userProfile: { ssin: "  " } })).professional, false);
    assert.equal(getAuthenticationContext(createToken({ userProfile: { ssin: 123 } })).professional, false);
});

test("handles malformed tokens without throwing", () => {
    assert.equal(parseJwtPayload("invalid"), null);
    assert.equal(parseJwtPayload("header.%%%.signature"), null);
    assert.equal(getAuthenticationContext("header.e30.signature").professional, false);
});
