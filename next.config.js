/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,

    async rewrites() {
        return [
            {
                source: "/privacy",
                destination: "/legal/privacy.html",
            },
            {
                source: "/terms",
                destination: "/legal/terms.html",
            },
        ];
    },
};
