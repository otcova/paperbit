# Webpack

This is a step guide for creating a new webpack project, 
if you already know how to create one,
feel free to go to the [Use Paperbit](#use-paperbit) section.

## System Requirements
 * <a href="http://nodejs.org/" target="_blank">Node.js 12.22.0</a> or later
 
## Setup

#### Install the Dependencies
Open the terminal on a new file, and create the npm project with the command:

	npm init -y


Install Paperbit

	npm install paperbit 

And finally install the development dependencies

	npm install -D webpack webpack-cli webpack-dev-server babel-loader @babel/core


#### Create the first project files
Now that we have all the dependencies, we have to setup them so they work as we want.

Fist we need a `webpack.config.js` file to tell webpack what to do:
```javascript
const path = require('path');

module.exports = {
	mode: 'development',
	
	devtool: 'inline-source-map',
	entry: './src/main.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_module/,
				use: 'babel-loader'
			}]
	},
	resolve: {
		extensions: ['.js']
	},
	devServer: {
		port: 80,
		static: { directory: path.resolve('public') },
		client: { logging: 'warn' },
	},
}
```

In that configuration we tolled to webpack:

- Our javascript source code is in the `src` folder, and the entrypoint is the file `main.js`
- Bundle the source code in a single file `index.js`
- And serve the folder `public` on `http://localhost` 

Now we have to create the `src` folder with the `main.js` file:
```javascript
console.log("Hello world!")
```
We also need a `index.html` file on the `public` folder, which will tell the web client to load the bundled code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Paperbit</title>
	<style>
		html, body {
			width: 100%;
			height: 100%;
			margin: 0px;
		}
	</style>
	<script src="./index.js" defer></script>
</head>
<body>
</body>
</html>
```

#### Serve the web
Now we have all set up, to launch the website you can use this single command:

	npx webpack serve

It will serve on the <http://localhost> website 
and it will update when you change the source code.

It's recommended to add the command to the `package.json` file, inside the "scripts" add the following line
```json
// [...]
// "scripts": {
		"serve": "webpack serve",
// [...]
```
and now you can serve with the following

	npm run serve

## Use Paperbit

Finally we have our project setup, now we can use the Paperbit library.

All the javascript code will be inside the `src` folder, so feel free to add new files when your main gets big.
At the moment, we have to initialize the library, so replace the code you have in the entrypoint (`main.js`) with the following:

```javascript
import { Paperbit } from "paperbit"

const paperbit = new Paperbit()
const { ellipse, mouse } = paperbit.api

paperbit.api.onDraw = () => {
	ellipse(...mouse.pos, .1)
}
```

Now serve it (`npm run serve`) and the fun part begins.

## Next Steps

Now we have a place to start coding and develop our ideas.
To learn how Paperbit works go to the next section: [Getting started]()