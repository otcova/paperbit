import "./paperbit.js"

for (const paperbitDiv of document.getElementsByClassName("paperbit")) {
	const source = paperbitDiv.textContent
	const nodes = []
	while (paperbitDiv.childNodes.length > 0) {
		nodes.push(paperbitDiv.childNodes[0])
		paperbitDiv.childNodes[0].remove()
	}
	
	paperbitDiv.style.display = "flex"
	paperbitDiv.style.flexWrap = "wrap"
	paperbitDiv.style.alignItems = "center"
	paperbitDiv.style.marginTop = "1em"
	paperbitDiv.style.marginBottom = "1em"
	
	const bitContainer = document.createElement("div")
	bitContainer.style.background = "#FFF"
	bitContainer.style.marginRight = "1em"
	bitContainer.style.flexShrink = "0"
	bitContainer.style.width = "178px"
	bitContainer.style.height = "100px"
	paperbitDiv.appendChild(bitContainer)
	
	const sourceContainer = document.createElement("div")
	sourceContainer.style.flexShrink = "0"
	sourceContainer.style.flexGrow = "1"
	paperbitDiv.appendChild(sourceContainer)
	for (const node of nodes) sourceContainer.appendChild(node)
	
	const canvas = new paperbit.PaperbitCanvas(bitContainer)
	const { rect, mouse, state, frame } = canvas.api
	canvas.api.onDraw = () => {
		eval(source)
	}
}