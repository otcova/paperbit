# Core Concepts

Paperbit has two distinct parts, the [graphics engine](#graphics-engine) and the [utilities](#utilities).

## Graphics Engine

#### PaperbitCanvas

The first thing you will do in a Paperbit project, is to create a `PaperbitCanvas` object.
It is the responsible of creating the canvas.
His job is to request frames to the PaperbitAPI.
When a frame request is complete,
it sends to the gpu all the geometry in a single draw call.

#### PaperbitAPI

When creating the PaperbitCanvas it will create automatically the api.
When using Paperbit the 99% of the time we are going to interact with the PaperbitAPI
because it is the responsible of creating the frame data. 
When the PaperbitCanvas request a frame PaperbitAPI will fire the needed events (onStart, onDraw, onMouseMove, ...),
and when they return, it will send back to the PaperbitCanvas all the geometry.

Having this two classes (canvas and api) let us to create the canvas on the main thread
and use the api on a [web worker](./graphics/initialize.md#web-worker). 

## Utilities

When using a graphics library, it is always nice to have some common features in our disposal:
- [Vector](utils/vector.md) operations
- [Matrix](utils/matrix.md) operations
- [Geometric](utils/geometry.md) operations
- [Smooth](utils/smooth_bit.md) the transition of a number

The main purpose of the utilities is to avoid reinventing the wheel in each project.
It is not necessary to use them, but in some circumstances they might be very helpful.