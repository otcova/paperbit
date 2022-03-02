
<script src="../../../code/paperbit-snippets.js" type="module" defer></script>

# Triangle

<div id="paperbit-snippets">

```javascript
const { triangle, mouse, state, frame } = canvas.api
```

```javascript
triangle([0, -0.8], [-1, 0.8], [1, 0.8])
```

```javascript
triangle([-1, 0.5], [1, 0.5], [0, -1])
triangle([-1, -0.5], [1, -0.5], [0, 1])
```

```javascript
const topL = [-frame.size[0], frame.size[1]]
const topR = [frame.size[0], frame.size[1]]
triangle(topL, topR, mouse.pos)

const bottomL = [-frame.size[0], -frame.size[1]]
const bottomR = [frame.size[0], -frame.size[1]]
triangle(bottomL, bottomR, mouse.pos)
```

</div>

## Function

```javascript
triangle(vertexA, vertexB, vertexC)
```


| Parameter | Type | Default Value |
|:-:|:-:|:-:|
| `vertexA` | [number, number, number = 0] | - |
| `vertexB` | [number, number, number = 0] | - |
| `vertexC` | [number, number, number = 0] | - |

## State Configuration

The comportment of the function can be modified by editing
this state property:

- [`state.color`]() --- set the color of the ellipse.
