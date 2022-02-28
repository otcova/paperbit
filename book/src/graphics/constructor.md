# Paperbit Constructor

A Paperbit context consist of the PaperbitCanvas, and the PaperbitAPI.
When calling `new PaperbitCanvas(...)` it will also create a PaperbitAPI, 
but we are not forced to used it (as demonstrated on the [Web worker](#web-worker) section).

## Recommended

For most user cases, this is the better (and simplest) approach.
PaperbitCanvas is creating the canvas at the provided container (`document.body`),
and it is also creating a PaperbitAPI instance already linked with the canvas.

```javascript
const bit = new PaperbitCanvas(document.body)
const { ellipse, mouse } = bit.api

bit.api.onDraw = () => {
	ellipse(...mouse.pos, .1)
}
```



## Web worker

> ⚠️ This is still in a very early access, things might change.

If we want to isolate or don't block the main thead, 
using a web worker should be a choice to consider.

On the main thread we can create only the canvas and WebGL context.
For Paperbit to understand that we only need the canvas,
we need to get it's `onFrameRequest` event.
This way when a frame is requested, we will need to send it to the API.

- Main Thread Code:
```javascript
let resolveFrame
onmessage = event => {
	if (event.data.type == "frameResult")
		resolveFrame(event.data.frameData)
}

const onFrameRequest =  frameData => {
	postMessage({ type: "doFrame", frameData })
	return new Promise(r => resolveFrame = r)
}

const paperbit = new PaperbitCanvas(document.body, onFrameRequest)
```

On the worker side, we can create a PaperbitAPI, it will return the api and a doFrame function.
When we receive the frame request we can use the doFrame function, 
witch will start calling all the events (onStart, onDraw, mouse.onMove, ...).
When all events return the function will return as well.
Finally we only need to send the frameData to the main thread to end the frame.

- Web Worker Code:
```javascript
onmessage = event => {
	if (event.data.type == "doFrame")
		postMessage({ type: "frameResult", frameData: doFrame(event.data.frameData)})
}

const [api, doFrame] = new PaperbitAPI()
const { ellipse, mouse } = api

api.onDraw = () => {
	ellipse(...mouse.pos, .1)
}
```