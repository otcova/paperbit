<script src="../../../code/paperbit-snippets.js" type="module" defer></script>

# Vector

## Import

```javascript
import { vec } from "paperbit"
```

## Content

| Method    | Arguments                |
| :-------- | :----------------------- |
| equal     | `v, u, tolerance = 1e-9` |
| add       | `v, ...vectors`          |
| sub       | `v, ...vectors`          |
| mult      | `v, ...vectors`          |
| div       | `v, ...vectors`          |
| dot       | `v, u`                   
| round     | `v`                      |
| floor     | `v`                      |
| ceil      | `v`                      |
| length    | `v`                      |
| distance  | `a, b`                   |
| normalize | `v`                      |
| resize    | `v, newSize`             |

## Examples

<div id="paperbit-snippets">

```js
const { ellipse, rect, state, mouse, frame } = canvas.api
```

```js
ellipse(...frame.size, 2)
ellipse(...vec.mult(-1, frame.size), 2)
ellipse(...vec.mult([1, -1], frame.size), 2)
ellipse(...vec.mult([-1, 1], frame.size), 2)
```

```js
ellipse(0, 0, 2)
state.color = 1
ellipse(...vec.resize(mouse.pos, .4), 1)
```

```js
ellipse(0, 0, 2)
state.color = 1
const len = Math.min(.4, vec.length(mouse.pos))
ellipse(...vec.resize(mouse.pos, len), 1)
```

```js
const p = vec.mult(2, mouse.pos)
rect(...vec.div(vec.round(p), 2), .5)
```

```js
ellipse(0, 0, 2 * vec.length(mouse.pos))
```

```js
const a = [-1.2, -0.7]
const b = [1, 0.5]

state.colorAlpha = .5

ellipse(...a, 2 * vec.distance(a, mouse.pos))
ellipse(...b, 2 * vec.distance(b, mouse.pos))

state.color = [.8, .2, .2]
ellipse(...mouse.pos, .1)
```

```js
const pos = [-.2, .1]
const size = 1.3

if (!vec.equal(mouse.pos, pos, size/2))
	rect(...pos, size)
```

```js
const pos = [-.2, .1]
const size = [1.6, 0.6]

if (vec.equal(mouse.pos, pos, vec.div(size, 2)))
	state.color = [.8, .2, .2]

rect(...pos, ...size)
```

</div>