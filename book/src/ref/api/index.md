# PaperbitAPI

The graphics API is composed of three components.
- [Graphic Functions](./graphic-functions/index.md) --- Create geometry
- [State](./state/index.md) --- Customize the geometry
- [Canvas Data](./canvas-data/index.md) --- Animate the geometry

As we can see, the only purpose of the API is to create geometry,
so understanding who geometry works is understanding who PaperbitAPI also works.

## Geometry

When calling any graphical function, geometry is always created.
In other words, some triangles are pushed to the frame buffer.
Note that ellipses are not made with a polygon with a lot of sides because it wold be very inefficient
(more detail on [ellipse]()).

## The Canvas Space

The space where geometry moves is more important that the geometry itself.
This space is defined by a simple Cartesian coordinate system.

Most graphical programs have the origin on the left and top of the screen.
This is caused in the history. Early computers had Cathode Ray Tubes
which "draw" the image with a cathode ray from the upper left corner to the lower right.

For our purposes we used a centered origin,
and a scale that is not fixed by the screen resolution.
This way we don't have to worry about the different screen sizes.
It can be seen in the following screens:

<div style="display: flex; align-items: center; justify-content: space-evenly;">
	<div style="display: flex; align-items: center; justify-content: center;  flex-direction: column;">
		<div style="display: flex; align-items: center; justify-content: center; margin: 5px; border: 1px solid var(--fg); background: var(--links); width: 100px; height: 100px;">
			✖
		</div>
		1:1
	</div>
	<div style="display: flex; align-items: center; justify-content: center;  flex-direction: column;">
		<div style="display: flex; align-items: center; justify-content: center; margin: 5px; border: 1px solid var(--fg); background: var(--links); width: 100px; height: 178px;">
			<div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border: 1px dashed var(--fg); margin: -1px;">
				✖
			</div>
		</div>
		9:16
	</div>
	<div style="display: flex; align-items: center; justify-content: center;  flex-direction: column;">
		<div style="display: flex; align-items: center; justify-content: center; margin: 5px; border: 1px solid var(--fg); background: var(--links); width: 178px; height: 100px;">
			<div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border: 1px dashed var(--fg); margin: -1px;">
				✖
			</div>
		</div>
		16:9
	</div>
</div>

The cross (✖) represents the center of the screen, and it is the origin of our coordinate system.
The dashed lines indicates where the x and y coordinate equals 1.
This system is very useful to work with different monitor sizes,
because it automatically rescales the content.

However, some times we will need to work in pixel units.
For that purpose we have `frame.pixelSize`
that indicates the size of a single pixel in the screen.
Se more about how to use it on the [frame](./canvas-data/frame.md) section.