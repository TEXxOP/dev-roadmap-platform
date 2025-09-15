/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'assets.aceternity.com',
            'images.unsplash.com',
            'www.w3.org',
            'aceternity.com',
            'i0.wp.com',
            'th.bing.com',
            'jaredchu.com',
            'res.cloudinary.com',
            'cloudinary.com'
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
    },
    
    // Performance optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    
    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
    
    // Experimental features for better performance
    experimental: {
        optimizePackageImports: ['@tabler/icons-react', 'lucide-react'],
    },
};

export default nextConfig;
