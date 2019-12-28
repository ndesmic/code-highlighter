import { Tokenizer } from "../lib/tokenizer.js";
import { tokensToDom } from "../lib/tokens-to-dom.js";

const tokenizer = new Tokenizer([
	{ matcher: "\n", type: "newline", kind: "whitespace" },
	{ matcher: "\t", type: "tab", kind: "whitespace" },
	{ matcher: /^\s+/, type: "generic-whitespace", kind: "whitespace" },
	{ matcher: /^[\"\'](.*?)[\"\']/, type: "string-literal", kind: "literal" },
	{ matcher: "break", type: "keyword:break", kind: "keyword" },
	{ matcher: "case", type: "keyword:case", kind: "keyword"},
	{ matcher: "catch", type: "keyword:catch", kind: "keyword"},
	{ matcher: "class", type: "keyword:class", kind: "keyword"},
	{ matcher: "const", type: "keyword:const", kind: "keyword"},
	{ matcher: "continue", type: "keyword:continue", kind: "keyword"},
	{ matcher: "debugger", type: "keyword:debugger", kind: "keyword"},
	{ matcher: "default", type: "keyword:default", kind: "keyword"},
	{ matcher: "delete", type: "keyword:delete", kind: "keyword"},
	{ matcher: "do", type: "keyword:do", kind: "keyword"},
	{ matcher: "else", type: "keyword:else", kind: "keyword"},
	{ matcher: "export", type: "keyword:export", kind: "keyword"},
	{ matcher: "extends", type: "keyword:extends", kind: "keyword"},
	{ matcher: "finally", type: "keyword:finally", kind: "keyword"},
	{ matcher: "for", type: "keyword:finally", kind: "keyword"},
	{ matcher: "from", type: "keyword:from", kind: "keyword"},
	{ matcher: "function", type: "keyword:function", kind: "keyword"},
	{ matcher: "if", type: "keyword:if", kind: "keyword"},
	{ matcher: "import", type: "keyword:import", kind: "keyword"},
	{ matcher: "in", type: "keyword:in", kind: "keyword"},
	{ matcher: "instanceof", type: "keyword:instanceof", kind: "keyword"},
	{ matcher: "let", type: "keyword:let", kind: "keyword"},
	{ matcher: "new", type: "keyword:new", kind: "keyword"},
	{ matcher: "return", type: "keyword:return", kind: "keyword"},
	{ matcher: "super", type: "keyword:super", kind: "keyword"},
	{ matcher: "switch", type: "keyword:switch", kind: "keyword"},
	{ matcher: "this", type: "keyword:this", kind: "keyword"},
	{ matcher: "throw", type: "keyword:throw", kind: "keyword"},
	{ matcher: "try", type: "keyword:try", kind: "keyword"},
	{ matcher: "typeof", type: "keyword:typeof", kind: "keyword"},
	{ matcher: "var", type: "keyword:var", kind: "keyword"},
	{ matcher: "void", type: "keyword:void", kind: "keyword"},
	{ matcher: "while", type: "keyword:while", kind: "keyword"},
	{ matcher: "with", type: "keyword:with", kind: "keyword"},
	{ matcher: "yield", type: "keyword:yield", kind: "keyword"},
	{ matcher: ",", type: "comma", kind: "operator" },
	{ matcher: ";", type: "semicolon", kind: "delimiter" },
	{ matcher: "{", type: "open-curly", kind: "grouping" },
	{ matcher: "}", type: "close-curly", kind: "grouping" },
	{ matcher: "[", type: "open-square", kind: "grouping" },
	{ matcher: "]", type: "close-square", kind: "grouping" },
	{ matcher: "(", type: "open-paren", kind: "grouping" },
	{ matcher: ")", type: "close-paren", kind: "grouping" },
	{ matcher: "+", type: "plus", kind: "operator"},
	{ matcher: "-", type: "minus", kind: "operator"},
	{ matcher: "*", type: "multiply", kind: "operator" },
	{ matcher: "/", type: "divide", kind: "operator" },
	{ matcher: "++", type: "increment", kind: "operator" },
	{ matcher: "--", type: "decrement", kind: "operator" },
	{ matcher: "**", type: "exponent", kind: "operator" },
	{ matcher: "=", type: "equal-assign", kind: "operator" },
	{ matcher: "==", type: "equal-compare", kind: "operator" },
	{ matcher: "===", type: "equal-compare-strict", kind: "operator" },
	{ matcher: "\"", type: "double-quote", kind: "operator" },
	{ matcher: "\'", type: "single-quote", kind: "operator" },
	{ matcher: "`", type: "backtick" },
	{ matcher: ".", type: "dot", kind: "delimiter" },
	{ matcher: /^[0-9]\.?[0-9]?/, type: "number-literal", kind: "literal" },
	{ matcher: /^[a-zA-Z]+/, type: "identifier", kind: "identifier" }
]);

customElements.define("code-highlight",
	class extends HTMLElement {
		static get observedAttributes(){
			return [];
		}
		constructor(){
			super();
			this.bind(this);
		}
		bind(element){
			element.render = element.render.bind(element);
			element.attachEvents = element.attachEvents.bind(element);
			element.cacheDom = element.cacheDom.bind(element);
			element.highlightSyntax = element.highlightSyntax.bind(element);
		}
		render(){
			this.attachShadow({ mode: "open" });
			this.shadowRoot.innerHTML = `
				<style>
					:host { display: grid; grid-template-columns: [edit] 50% [output]; }
					textarea { grid-column-start: edit; }
					#output { grid-column-start: output; background: #222; }
					.accent1 { color: violet; }
					.accent2 { color: blue; }
					.identifier { color: lightblue; }
					.operator { color: white; }
					.string-literal { color: orange; }
				</style>
				<textarea></textarea>
				<div id="output"></div>
			`;
		}
		connectedCallback(){
			this.render();
			this.cacheDom();
			this.attachEvents();
		}
		cacheDom(){
			this.dom = {
				edit: this.shadowRoot.querySelector("textarea"),
				output: this.shadowRoot.querySelector("#output")
			};
		}
		attachEvents(){
			this.dom.edit.addEventListener("input", this.highlightSyntax);
		}
		highlightSyntax(){
			const tokens = tokenizer.getTokens(this.dom.edit.value);
			this.dom.output.innerHTML = "";
			this.dom.output.appendChild(tokensToDom(tokens));
		}
		attributeChangedCallback(name, oldValue, newValue){
			this[name] = newValue;
		}
	}
);
