# PaperbitAPI

The graphics API is composed of three components.
- [Graphic Functions](#graphic-functions)
- [State](#state)
- [Events](#events)

## Graphic Functions

For drawing to the canvas we need to create geometry.
This functions only request position and size,
the color, texture, and other configurations are managed by the [State](#state).

- [rect]() — Draw a rectangle from position and size
- [ellipse]() — Draw an ellipse from position and size
- [triangle]() — Draw a triangle from three coordinates
- [triangleStrip]() — Draw a triangle strip from a list of coordinates
- [line]() — Draw a line from a list of coordinates

## State

We can customize the geometry and modify the graphics functions comportment by editing the state.
The State can be classified with two different sections:
- The ones that directly [gets or sets](#get-and-set) the state.
- The ones that [modifies or transforms](#modifiers) the state.

### Get and Set
#### Color
- [color]() — Get and set the color of the geometry [r, g, b, a] with floats between 0 to 1.
- [colorHex]() — Get and set the color with a single hexadecimal number (0xFF00FF).
- [colorAlpha]() — Get and set the alpha component of the color (the transparency).

#### Texture
- [texture]() — Get and set the texture used in the geometry.
- [textureColorBlend]() — Get and set the blend formula to blend the color with the texture.

#### Rect
- [rectOrigin]() — Get and set the origin of the rect.
- [rectUV]() — Get and set the texture coordinates.

#### Text
- [textOrigin]() — Get and set the origin of the text.
- [font]() — Get and set the font used to draw text.

#### Line
- [lineWidth]() — Get and set the line width.
- [lineCap]() — Get and set the type of the line end (round, square, ...).
- [lineJoin]() — Get and set the type of the joints which connect line segments (round, square, ...).

#### Matrix
- [matrix]() — Get and set the transformation matrix used in the geometry.
- [inverseMatrix]() — Get the inverse of the transformation matrix.

### Modifiers
- [scope]() — Create a scope for the state.
- [translate]() — Move the geometry.
- [rotate]() — Rotate the geometry with any axis.
- [rotateX]() — Rotate the geometry with X axis.
- [rotateY]() — Rotate the geometry with Y axis.
- [rotateZ]() — Rotate the geometry with Z axis.
- [scale]() — Scale the geometry.

## Events

Finally, the api manages events so we can execute the code when it is required.
There are 

- [onStart]() — Fires after the first frame.
- [onDraw]() — Fires every frame.

### Mouse
The `api.mouse` manages their own events, but instead of using them
we could check the [mouse]() data every frame.
 
- [onMove]()
- [onWheel]()
- [onDown]()
- [onUp]()

### Keyboard
The `api.keyboard` functions the same way that the mouse.
It manages their own events, but instead of using them
we could check the [keyboard]() data every frame.

- [onDown]() — Fires when a key is pressed, 'ó' would create two events ('´' and 'o').
- [onUp]() — Fires when a key is released, 'ó' would create two events ('´' and 'o').
- [onType]()  — Fires a letter when it is typed, 'ó' would create a single event.

### Frame
The `api.frame` functions the same way that the mouse and keyboard.
It manages their own events, but instead of using them
we could check the [frame]() data every frame.

- [onResize]() — Fires when the canvas size has been resized.