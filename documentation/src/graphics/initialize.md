# Initialize Paperbit

A Paperbit context consist in the Paperbit canvas, and the Paperbit API.
They can be created in various environments.

## Recommended

The simplest way to do it. Paperbit constructor is creating the canvas on the HTML element that is provided (`document.body`)
and is also creating an api instance already linked with the canvas. 

```javascript
const bit = new Paperbit(document.body)
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

const paperbit = new Paperbit(document.body, onFrameRequest)
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