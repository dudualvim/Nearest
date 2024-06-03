/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
        ],
        dangerouslyAllowSVG: true,
    },
    typescript: { ignoreBuildErrors: true },
    eslint: { dirs: ['.'], ignoreDuringBuilds: true },


    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            {
                source: '/api/maps',
                headers: [
                    { key: 'Content-Type', value: 'application/json'},
                    { key: 'X-Goog-Api-Key', value: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY},
                    { key: 'X-Goog-FieldMask', value: 'places.displayName,places.formattedAddress,places.priceLevel'},
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
        
        
    }
};

export default nextConfig;
