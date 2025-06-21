module.exports = {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    crossOrigin: 'anonymous',
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://127.0.0.1:3001/api/:path*',
          },
        ]
      },
}