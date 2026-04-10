/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

if (!apiDomain) {
    throw new Error(
        "Missing required environment variable: NEXT_PUBLIC_API_DOMAIN",
    );
}

const normalizedApiDomain = apiDomain.replace(/\/+$/, "");

const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://cdn.jsdelivr.net https://fonts.gstatic.com",
    `connect-src 'self' ${normalizedApiDomain}${isDev ? " ws: wss: http://localhost:3000 http://localhost:3001" : ""}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
];

const securityHeaders = [
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "Content-Security-Policy",
        value: cspDirectives.join("; "),
    },
];

const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
