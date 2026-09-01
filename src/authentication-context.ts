export type AuthenticationContext = {
    professional: boolean;
};

type JwtPayload = {
    userProfile?: {
        ssin?: unknown;
    };
};

export function parseJwtPayload(token: string): JwtPayload | null {
    try {
        const segments = token.split(".");
        if (segments.length < 2 || !segments[1]) {
            return null;
        }

        const base64 = segments[1].replace(/-/g, "+").replace(/_/g, "/");
        const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
        const payload = JSON.parse(atob(paddedBase64));

        return typeof payload === "object" && payload !== null ? payload as JwtPayload : null;
    } catch {
        return null;
    }
}

export function getAuthenticationContext(token: string): AuthenticationContext {
    const professionalSsin = parseJwtPayload(token)?.userProfile?.ssin;

    return {
        professional: typeof professionalSsin === "string" && professionalSsin.trim().length > 0
    };
}
