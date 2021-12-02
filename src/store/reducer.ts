export const sum = (a: number, b: number) => a + b;


type ActionsType = {
	type: "SUM" | "MULT" | "SUB" | "DIV" | "EXP"
	number: number
}

export const calculator = (state: number, action: ActionsType) => {
	switch (action.type) {
		case "SUM":
			return state + action.number
		case "MULT":
			return state * action.number
		case "SUB":
			return state - action.number
		case "DIV":
			return state / action.number
		case "EXP":
			return state ** action.number
		default:
			return state
	}
}
