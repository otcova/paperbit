import { PaperbitCanvas, vec } from "./paperbit.js"

const container = document.getElementById("paperbit-snippets")
let snippetsHeadSrc = null
const snippets = []

while (container.childNodes.length > 1) {
	const index = snippetsHeadSrc === null? 0 : 1
	if (container.childNodes[index].style) {
		if (snippetsHeadSrc === null) {
			snippetsHeadSrc = container.childNodes[index].textContent
			continue
		}
		snippets.push({
			source: container.childNodes[index].textContent,
			content: [container.childNodes[index]]
		})
	}
	container.childNodes[index].remove()
}



for (const snippet of snippets) {

	snippet.container = document.createElement("div")
	snippet.container.style.display = "flex"
	snippet.container.style.flexDirection = "row"
	snippet.container.style.marginTop = "1em"
	snippet.container.style.marginBottom = "1em"
	snippet.container.style.gap = "1em"
	container.appendChild(snippet.container)

	createSnippetCanvas(snippet.container, snippet)
	createSnippetCode(snippet.container, snippet)
}

const checkSnippetsWrap = () => {
	for (const snippet of snippets)
		snippet.container.style.flexDirection = window.innerWidth > 750 ? "row" : "column"
	return checkSnippetsWrap
}
addEventListener("resize", checkSnippetsWrap())


function createSnippetCanvas(container, snippet) {
	const div = document.createElement("div")
	container.appendChild(div)

	div.style.flexShrink = 0
	div.style.background = "#FFFE"
	const h = 200
	div.style.width = h + "px"
	div.style.height = h * 9 / 16 + "px"

	const canvas = new PaperbitCanvas(div)
	canvas.api.onDraw = () => {
		eval(snippetsHeadSrc + "\n" + snippet.source)
	}
}

function createSnippetCode(container, snippet) {
	const div = document.createElement("div")
	container.appendChild(div)
	div.style.width = "100%"
	div.style.overflowX = "hidden"
	for (const element of snippet.content) {
		element.style.margin = "0px"
		div.appendChild(element)
	}
}