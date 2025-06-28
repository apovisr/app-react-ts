module.exports = {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    crossOrigin: 'anonymous',
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `https://f8u71mn8d4.execute-api.us-east-1.amazonaws.com/:path*` ,
          },
        ]
      },
}