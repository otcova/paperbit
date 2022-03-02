
<script src="../../../code/paperbit-snippets.js" type="module" defer></script>

# Ellipse

<div id="paperbit-snippets">

```js
const { ellipse, state, frame } = canvas.api
```

```js
ellipse(0, 0, 1)
```

```js
const t = 2 * frame.time
for (let i = 0; i < 6; ++i) {
	const x = 0.6 * Math.sin(t - i)
	const y = 0.6 * Math.cos(t - i)
	ellipse(x, y, 0.6 - i / 10)
}
```

```js
ellipse(0, 0, 1 + 2 * frame.pixelSize)
state.color = 1
ellipse(0, 0, 1)
```

</div>

## Function

```js
ellipse(x, y, width, height?)
```


| Parameter | Type | Default Value |
|:-:|:-:|:-:|
| `x` | number | - |
| `y` | number | - |
| `width` | number | - |
| `height` | number | width |

## State Configuration

The comportment of the function can be modified by editing
this state property:

- [`state.color`]() --- set the color of the ellipse.
