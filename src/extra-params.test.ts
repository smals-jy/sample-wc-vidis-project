import assert from "node:assert/strict";
import test from "node:test";
import { parseExtraParams } from "./extra-params";

test("parses a JSON object", () => {
    assert.deepEqual(parseExtraParams('{"id":"123"}'), { id: "123" });
});

test("rejects invalid JSON and non-object JSON values", () => {
    assert.throws(() => parseExtraParams("{ id: '123' }"));
    assert.throws(() => parseExtraParams("null"));
    assert.throws(() => parseExtraParams("[]"));
});
