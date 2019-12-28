function tryConsume(matcher, value){
	if (typeof (matcher) === "string" && value.startsWith(matcher)) {
		return { value: matcher, length: matcher.length };
	}
	if (matcher instanceof RegExp && matcher.test(value)) {
		const matches = value.match(matcher);
		if(matches){
			return { value: matches[0], length: matches[0].length };
		}
	}
}

export const END = "$END$";

export class Tokenizer {
	constructor(tokenTypes){
		this.tokenTypes = tokenTypes;
	}
	*getTokens(text){
		let index = 0;
		while(index < text.length){
			let match = false;
			const remaining = text.substring(index);
			for(let tokenType of this.tokenTypes){
				const consumed = tryConsume(tokenType.matcher, remaining);
				if(consumed){
					yield {
						type: tokenType.type,
						kind: tokenType.kind,
						value: consumed.value,
						index
					};
					index += consumed.length;
					match = true;
					break;
				}
			}
			if(!match){
				index++;
			}
		}
		yield {
			type: END,
			kind: "control",
			value: null,
			index
		};
		return;
	}
	*getTokensStage2(tokens){

	}
}