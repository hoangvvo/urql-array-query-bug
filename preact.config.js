module.exports = function(config) {
	config.devServer.proxy = [
		{
			// proxy requests matching a pattern:
			path: '/graphql',

			// where to proxy to:
			target: 'http://localhost:9000',

			// optionally change Origin: and Host: headers to match target:
			changeOrigin: true,
			changeHost: true
		}
	];
};