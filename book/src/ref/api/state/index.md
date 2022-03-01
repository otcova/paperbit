# State

We can customize the geometry and modify the graphics functions comportment by editing the state.
The State can be classified with two different sections:
- The ones that directly [gets or sets](#get-and-set) a value of the state.
- The ones that [modify ot transform](#modifiers) the state.

## Get and Set
#### Color
- [color]() --- Get and set the color of the geometry [r, g, b, a] with floats between 0 to 1.
- [colorHex]() --- Get and set the color with a single hexadecimal number (0xFF00FF).
- [colorAlpha]() --- Get and set the alpha component of the color (the transparency).

#### Texture
- [texture]() --- Get and set the texture used in the geometry.
- [textureColorBlend]() --- Get and set the blend formula to blend the color with the texture.

#### Rect
- [rectOrigin]() --- Get and set the origin of the rect.
- [rectUV]() --- Get and set the texture coordinates.

#### Text
- [textOrigin]() --- Get and set the origin of the text.
- [font]() --- Get and set the font used to draw text.

#### Line
- [lineWidth]() --- Get and set the line width.
- [lineCap]() --- Get and set the type of the line end (round, square, ...).
- [lineJoin]() --- Get and set the type of the joints which connect line segments (round, square, ...).

#### Matrix
- [matrix]() --- Get and set the transformation matrix used in the geometry.
- [inverseMatrix]() --- Get the inverse of the transformation matrix.

## Modifiers

#### Conserve the State
- [scope]() --- Create a scope for the state.

#### Spatial transformation

- [translate]() --- Move the geometry.
- [rotate]() --- Rotate the geometry with any axis.
- [rotateX]() --- Rotate the geometry with X axis.
- [rotateY]() --- Rotate the geometry with Y axis.
- [rotateZ]() --- Rotate the geometry with Z axis.
- [scale]() --- Scale the geometry.