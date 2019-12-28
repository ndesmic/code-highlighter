import {
	Tokenizer
} from "../../js/lib/tokenizer.js";

describe("Tokenizer", () => {
	let tokenizer;
	beforeEach(() => {
		tokenizer = new Tokenizer([
			{ matcher: /^\s+/, type: "whitespace" },
			{ matcher: "break", type: "break-keyword" },
			{ matcher: "case", type: "case-keyword" },
			{ matcher: "catch", type: "catch-keyword" },
			{ matcher: "class", type: "class-keyword" },
			{ matcher: "const", type: "const-keyword" },
			{ matcher: "continue", type: "continue-keyword" },
			{ matcher: "debugger", type: "debugger-keyword" },
			{ matcher: "default", type: "default-keyword" },
			{ matcher: "delete", type: "delete-keyword" },
			{ matcher: "do", type: "do-keyword" },
			{ matcher: "else", type: "else-keyword" },
			{ matcher: "export", type: "export-keyword" },
			{ matcher: "extends", type: "extends-keyword" },
			{ matcher: "finally", type: "finally-keyword" },
			{ matcher: "for", type: "finally-keyword" },
			{ matcher: "from", type: "from-keyword" },
			{ matcher: "function", type: "function-keyword" },
			{ matcher: "if", type: "if-keyword" },
			{ matcher: "import", type: "import-keyword" },
			{ matcher: "in", type: "in-keyword" },
			{ matcher: "instanceof", type: "instanceof-keyword" },
			{ matcher: "let", type: "let-keyword" },
			{ matcher: "new", type: "new-keyword" },
			{ matcher: "return", type: "return-keyword" },
			{ matcher: "super", type: "super-keyword" },
			{ matcher: "switch", type: "switch-keyword" },
			{ matcher: "this", type: "this-keyword" },
			{ matcher: "throw", type: "throw-keyword" },
			{ matcher: "try", type: "try-keyword" },
			{ matcher: "typeof", type: "typeof-keyword" },
			{ matcher: "var", type: "var-keyword" },
			{ matcher: "void", type: "void-keyword" },
			{ matcher: "while", type: "while-keyword" },
			{ matcher: "with", type: "with-keyword" },
			{ matcher: "yield", type: "yield-keyword" },
			{ matcher: ",", type: "comma" },
			{ matcher: ";", type: "semicolon" },
			{ matcher: "{", type: "open-curly" },
			{ matcher: "}", type: "close-curly" },
			{ matcher: "[", type: "open-square" },
			{ matcher: "]", type: "close-square" },
			{ matcher: "(", type: "open-paren" },
			{ matcher: ")", type: "close-paren" },
			{ matcher: "+", type: "plus" },
			{ matcher: "-", type: "minus" },
			{ matcher: "*", type: "multiply" },
			{ matcher: "/", type: "divide" },
			{ matcher: "++", type: "increment" },
			{ matcher: "--", type: "decrement" },
			{ matcher: "**", type: "exponent" },
			{ matcher: "=", type: "equal-assign" },
			{ matcher: "==", type: "equal-compare" },
			{ matcher: "===", type: "equal-compare-strict" },
			{ matcher: "\"", type: "double-quote" },
			{ matcher: "\'", type: "single-quote" },
			{ matcher: "`", type: "backtick" },
			{ matcher: /^[0-9]+\.?[0-9]+/, type: "number-literal" },
			{ matcher: /^[a-zA-Z]+/, type: "identifier" }
		]);
	});
	it("tokenizes simple assignment with whitespace", () => {
		const tokens = [...tokenizer.getTokens("const foo = 123;")];
		expect(tokens.length).toBe(9);
		expect(tokens[0].type).toBe("const-keyword");
		expect(tokens[1].type).toBe("whitespace");
		expect(tokens[2].type).toBe("identifier");
		expect(tokens[3].type).toBe("whitespace");
		expect(tokens[4].type).toBe("equal-assign");
		expect(tokens[5].type).toBe("whitespace");
		expect(tokens[6].type).toBe("number-literal");
		expect(tokens[7].type).toBe("semicolon");
		expect(tokens[8].type).toBe("$END$");
	});
	it("tokenizes simple assignment without specific whitespace", () => {
		const tokens = [...tokenizer.getTokens("const foo=123;")];
		expect(tokens.length).toBe(7);
		expect(tokens[0].type).toBe("const-keyword");
		expect(tokens[1].type).toBe("whitespace");
		expect(tokens[2].type).toBe("identifier");
		expect(tokens[3].type).toBe("equal-assign");
		expect(tokens[4].type).toBe("number-literal");
		expect(tokens[5].type).toBe("semicolon");
		expect(tokens[6].type).toBe("$END$");
	});
	it("does not die if no match", () => {
		const tokens = [...tokenizer.getTokens("©")];
		expect(tokens.length).toBe(1);
		expect(tokens[0].type).toBe("$END");
	});
});