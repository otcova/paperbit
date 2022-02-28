const path = require('path');

module.exports = {
	mode: 'production',
	// devtool: 'source-map',
	entry: './lib/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'bundle'),
		library: 'paperbit',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_module/,
				use: 'babel-loader'
			}]
	},
	resolve: {
		extensions: ['.js']
	}
}