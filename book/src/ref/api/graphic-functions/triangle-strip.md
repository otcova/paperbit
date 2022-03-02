
<script src="../../../code/paperbit-snippets.js" type="module" defer></script>

# Triangle Strip

<div id="paperbit-snippets">

```javascript
const { triangleStrip, mouse, state, frame } = canvas.api
```

```javascript
triangleStrip([
	[0, 0.5],
	[-1, -0.5],
	[1, -0.5],
	[0, -1]
])
```

```javascript
const mesh = []
const step = 0.5 + Math.sin(frame.time) * .5
for (let angle = 0; angle < 4; angle += step) {
	mesh.push([
		Math.cos(angle), 
		Math.sin(angle)* 2 - 1
	])
	mesh.push([
		Math.cos(angle) * 0.5, 
		Math.sin(angle) * 1 - 1
	])
}
triangleStrip(mesh)
```

</div>

## Function

```javascript
triangleStrip(vertices)
```


| Parameter | Type | Default Value |
|:-:|:-:|:-:|
| `vertices` | [number, number, number = 0][] | - |

## State Configuration

The comportment of the function can be modified by editing
this state property:

- [`state.color`]() --- set the color of the ellipse.
