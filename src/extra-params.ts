export type ExtraParams = Record<string, unknown>;

export function parseExtraParams(value: string): ExtraParams {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new TypeError("Extra parameters must be a JSON object.");
    }

    return parsed as ExtraParams;
}
