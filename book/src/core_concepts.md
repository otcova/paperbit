# Core Concepts

Paperbit has two distinct parts, the [graphics engine](#graphics-engine) and the [utilities](#utilities).

## Graphics Engine

When we create an instance of `Paperbit`, two classes are initialized.

1. **PaperbitCanvas**

Is the responsible of creating the canvas and the WebGL context.
His job is to request frames to the PaperbitAPI.
When a frame request is complete, it sends to the gpu all the geometry in a single draw call.

2. **PaperbitAPI**

When using Paperbit the 99.9% of the time we are going to interact with the PaperbitAPI.
It is the responsible of creating the frame data. 
When the PaperbitCanvas request a frame, PaperbitAPI will fire the needed events (OnStart, onDraw, onMouseMove, ...).
Once all event returns, it will return to the PaperbitCanvas all the geometry.

Having this two classes (canvas and api) let us to create the canvas on the main thread
and use the api on a [web worker](./graphics/initialize.md#web-worker). 

## Utilities

When using a graphics library, it is always nice to have some common features in our disposal:
- [Vector](utils/vector.md) operations
- [Matrix](utils/matrix.md) operations
- [Geometric](utils/geometry.md) operations
- [Smooth](utils/smooth_bit.md) the transition of a number

They are not related in any way to the graphics engine.
The purpose of the utilities is to avoid reinventing the wheel in each project.