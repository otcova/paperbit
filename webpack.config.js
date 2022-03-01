const path = require('path');

const config = {
	mode: 'production',
	entry: './lib/index.js',
	experiments: { outputModule: true },
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

module.exports = [{
	...config,
	output: {
		filename: 'paperbit.js',
		path: path.resolve(__dirname, 'bundle'),
		library: { type: 'module' },
	},
}, {
	...config,
	output: {
		filename: 'paperbit.js',
		path: path.resolve(__dirname, 'book/src/code'),
		library: { type: 'module' },
	},
}]