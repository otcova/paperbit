# HTML

Setting up Paperbit on a HTML file is very straightforward,
you only have to follow these five small steps:

**1.** First create a folder for the project. 
It can have the name you want,
the purpose of the folder is to have a place to put all the files
without losing them.

**2.** Then create an `index.html` file with the following three elements:
- `<style>` --- to make the body of the size of the screen.
- `<script>` --- to include the paperbit library code.
- `<script>` --- to include your code.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Paperbit</title>
		<style> html, body { width: 100%; height: 100%; margin: 0; } </style>
		<script src="./paperbit.js" defer></script>
		<script src="./main.js" defer></script>
	</head>
	<body></body>
</html>
```

**3.** As we have written in the HTML file that exist a script named `paperbit.js`,
we need to add that
<a href="#" onclick="
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
">file</a>
to the folder.	 

**4.** Also, as we have written in the HTML file that our script is named `main.js`,
we will need to create the file.
In this case you can fill the file with the following Paperbit blank template:

```javascript
const { PaperbitCanvas } = paperbit

const canvas = new PaperbitCanvas(document.body)
const { ellipse, mouse } = canvas.api

canvas.api.onDraw = () => {
    ellipse(...mouse.pos, .1)
}
```

**5.** As the last step you can open the HTML file (`index.html`) with a browser,
and you will see a beautiful ellipse following your mouse.

## Next Steps

Now we have a place to start coding and develop our ideas.
To learn how Paperbit works go to the [Core Concepts](./../core_concepts.md)
section, and to power up we recommend to take a took to the [How To Continue]() section.