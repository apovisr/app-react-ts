module.exports = {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    crossOrigin: 'anonymous',
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_URL_BASE_API}/:path*` ,
          },
        ]
      },
}