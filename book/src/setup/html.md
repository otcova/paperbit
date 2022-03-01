# HTML

Setting up Paperbit on a HTML file is very straightforward,
you only have to follow these four simple steps:

## 1. Create a project folder
It can have the name you want,
the purpose of the folder is to have a place to put all the files
without losing them.

## 2. Create the HTML file
The HTML is going to tell to the browser what to do.
We are going to need the following two tags:
- `<style>` --- to make the body of the page the size of the screen.
- `<script>` --- to include your code.

The file can have the name you want,
the only requisite is that it should end with `.html`.
After creating the file, fill it with the following code:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Paperbit</title>
		<style> html, body { width: 100%; height: 100%; margin: 0; } </style>
		<script src="./main.js" type="module" defer></script>
	</head>
	<body></body>
</html>
```

This is a blank template with the two tags we talk about.
If you don't know HTML don't worry,
you are not going to need to modify it.

## 3. Create the source file
In HTML code, we told the browser to load a script named `main.js`,
so we need to create the file.
Paste the next code to the new `main.js` file.

```js
import { PaperbitCanvas } from "./paperbit.js"

const canvas = new PaperbitCanvas(document.body)
const { ellipse, mouse } = canvas.api

canvas.api.onDraw = () => {
    ellipse(...mouse.pos, .1)
}
```

This is a blank Paperbit template.
In this script we can observe three different parts:

- **Import the library**

```js
import { PaperbitCanvas } from "./paperbit.js"
```
The first line imports the PaperbitCanvas from the paperbit library,
so we will have to
<a href="#" onauxclick="event.preventDefault(); this.click()" onclick="
	console.log(event)
	if (!this.download) {
		event.preventDefault();
		fetch('https:\/\/raw.githubusercontent.com/otcova/paperbit/main/bundle/paperbit.js')
		.then(response => response.blob())
		.then(blob => {
			this.href = window.URL.createObjectURL(blob);
			this.download = 'paperbit.js';
			this.click();
		});
	}
">download</a>
the library (witch will be a single file), and move it to the projects folder.

- **Create the canvas**

```js
const canvas = new PaperbitCanvas(document.body)
const { ellipse, mouse } = canvas.api
```

The next two lines are creating a PaperbitCanvas instance in the body of our page.
Then we are extracting the `ellipse` and `mouse` properties from the canvas api.
We could call `canvas.api.ellipse` every time we need to draw an ellipse to the canvas,
but it's cleaner to store the function in a constant.

- **Draw to the canvas**

```js
canvas.api.onDraw = () => {
    ellipse(...mouse.pos, .1)
}
```

Now that we have the canvas and a draw function (ellipse),
we can set up a draw event.
When a new frame is requested the onDraw function will fire
and the code will be executed.

In this case we have an ellipse being drawn to the mouse position
and with a size of 0.1 units.
Note that the size of an ellipse usually is defined by two values (width and height).
However, in this case that we omitted the height dimension Paperbit is going to create an
ellipse of 0.1 units of width and height, aka a circle of 0.1 units of diameter.


## 4. Open the HTML file
Finally, we need to open the file to see our app.
You can do it by opening it with any browser.
You should see a beautiful ellipse following your mouse.

## Next Steps

Now we have a place to start coding and develop our ideas.
To learn how Paperbit works go to the [Core Concepts](./../core_concepts.md)
section, and to power up we recommend to take a took to the [How To Continue]() section.