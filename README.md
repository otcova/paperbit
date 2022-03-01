# Paperbit

A WebGL typescript and javascript graphics library.

## Documentation

Go to our [documentation](https://otcova.github.io/paperbit) 
and setup a new project with the [html step guide](https://otcova.github.io/paperbit/setup/html.html).

## Quick Start

1. Take a look at the [core concepts](https://otcova.github.io/paperbit/core_concepts.html).
1. Import paperbit to your project
1. And use this template to start programming.

```javascript
const canvas = new PaperbitCanvas(document.body)
const { ellipse, mouse } = canvas.api

canvas.api.onDraw = () => {
    ellipse(...mouse.pos, .1)
}
```

