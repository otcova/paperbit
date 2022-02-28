# Paperbit

A WebGL typescript and javascript WebGL graphics library.

Go to the [documentation](https://otcova.github.io/paperbit) to create a project from the start.
	
## Quick Start

Import paperbit to your project and you are ready to go.

```javascript
const paperbit = new PaperbitCanvas(document.body)
const { ellipse, mouse } = paperbit.api

paperbit.api.onDraw = () => {
    ellipse(...mouse.pos, .1)
}
```

You can read about the [core concepts](https://otcova.github.io/paperbit/core_concepts.html).