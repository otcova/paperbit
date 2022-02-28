# Events

Finally, the api manages events so we can execute the code when it is required.
There are 

- [onStart]() --- Fires after the first frame.
- [onDraw]() --- Fires every frame.

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

- [onDown]() --- Fires when a key is pressed, 'ó' would create two events ('´' and 'o').
- [onUp]() --- Fires when a key is released, 'ó' would create two events ('´' and 'o').
- [onType]()  --- Fires a letter when it is typed, 'ó' would create a single event.

### Frame
The `api.frame` functions the same way that the mouse and keyboard.
It manages their own events, but instead of using them
we could check the [frame]() data every frame.

- [onResize]() --- Fires when the canvas size has been resized.