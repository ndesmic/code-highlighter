const accent1 = ["break", "case", "catch", "continue", "do", "else", "export", "finally", "for", "from", "if", "import", "return", "switch", "throw", "try", "while", "with", "yield"];
const accent2 = ["const", "class", "debugger", "delete", "extends", "function", "in", "instanceof", "let", "new", "super", "this", "typeof", "var", "void"];

export function tokensToDom(tokens){
	tokens = [...tokens]; //can optimize later
	const docFrag = document.createDocumentFragment();
	for(let token of tokens){
		if(token.type === "generic-whitespace"){
			const text = document.createTextNode("\u00A0");
			docFrag.appendChild(text);
		} else if (token.type === "tab") {
			const text = document.createTextNode("\u00A0\u00A0\u00A0\u00A0");
			docFrag.appendChild(text);
		} else if(token.type === "newline"){
			const br = document.createElement("br");
			docFrag.appendChild(br);
		} else if(token.kind === "keyword") {
			const subTypes = token.type.split(":");
			const span = document.createElement("span");
			span.textContent = token.value;
			if(accent1.includes(subTypes[1])){
				span.classList.add("accent1");
			}
			else if(accent2.includes(subTypes[1])) {
				span.classList.add("accent2");
			}
			docFrag.appendChild(span);
		} else if (token.kind === "grouping" || token.kind === "operator"){
			const span = document.createElement("span");
			span.textContent = token.value;
			span.classList.add("operator");
			docFrag.appendChild(span);
		} else if (token.type === "string-literal"){
			const span = document.createElement("span");
			span.textContent = token.value;
			span.classList.add("string-literal");
			docFrag.appendChild(span);
		} else {
			const span = document.createElement("span");
			span.textContent = token.value;
			span.classList.add("identifier");
			docFrag.appendChild(span);
		}
	}
	return docFrag;
}