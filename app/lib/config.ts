const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

if (!apiDomain) {
	throw new Error(
		"Missing required environment variable: NEXT_PUBLIC_API_DOMAIN",
	);
}

const normalizedApiDomain = apiDomain.replace(/\/+$/, "");

export const API_BASE_URL = normalizedApiDomain.endsWith("/api")
	? normalizedApiDomain
	: `${normalizedApiDomain}/api`;
