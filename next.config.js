module.exports = {
    allowedDevOrigins: ['*.com'],
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                search: '',
            },
        ],
    },
}