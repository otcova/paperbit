
<script src="../../../code/paperbit-snippets.js" type="module" defer></script>

# Rectangle

<div id="paperbit-snippets">

```javascript
const { rect, mouse, state, frame } = canvas.api
```

```javascript
rect(0, 0, 1)
```

```javascript
rect(...mouse.pos, 1, .3)
```

```javascript
state.rectOrigin = [-1, -1]
rect(0, 0, ...mouse.pos)
```

</div>

## Function

```javascript
rect(x, y, width, height?)
```


| Parameter | Type | Default Value |
|:-:|:-:|:-:|
| `x` | number | - |
| `y` | number | - |
| `width` | number | - |
| `height` | number | width |

## State Configuration

The comportment of the function can be modified by editing
this state properties:

- [`state.color`]() --- set the color of the rectangle.
- [`state.rectOrigin`]() --- set the origin of the rectangle.
- [`state.rectUV`]() --- set the texture coordinates.
- [`state.texture`]() --- set the texture.
- [`state.textureColorBlend`]() --- set the equation used to mic the color with the texture.

