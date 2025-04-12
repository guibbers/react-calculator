import { type ReactNode, createContext, useContext, useReducer } from "react";

export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	CHOOSE_OPERATION: "choose-operation",
	CLEAR: "clear",
	DELETE_DIGIT: "delete-digit",
	EVALUATE: "evaluate",
} as const;

interface State {
	currentOperand: string | null;
	previousOperand: string | null;
	operation: string | null;
	overwrite?: boolean;
}

export type Action =
	| { type: typeof ACTIONS.ADD_DIGIT; payload: { digit: string } }
	| { type: typeof ACTIONS.CHOOSE_OPERATION; payload: { operation: string } }
	| { type: typeof ACTIONS.CLEAR }
	| { type: typeof ACTIONS.DELETE_DIGIT }
	| { type: typeof ACTIONS.EVALUATE };

const initialState: State = {
	currentOperand: null,
	previousOperand: null,
	operation: null,
};

function evaluate({ currentOperand, previousOperand, operation }: State) {
	const prev = Number.parseFloat(previousOperand || "");
	const current = Number.parseFloat(currentOperand || "");
	if (Number.isNaN(prev) || Number.isNaN(current)) return "";
	switch (operation) {
		case "+":
			return (prev + current).toString();
		case "-":
			return (prev - current).toString();
		case "*":
			return (prev * current).toString();
		case "÷":
			return (prev / current).toString();
		default:
			return "";
	}
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOperand: action.payload.digit,
					overwrite: false,
				};
			}
			if (action.payload.digit === "0" && state.currentOperand === "0")
				return state;
			if (action.payload.digit === "." && state.currentOperand?.includes("."))
				return state;
			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${action.payload.digit}`,
			};

		case ACTIONS.CHOOSE_OPERATION:
			if (!state.currentOperand && !state.previousOperand) return state;
			if (!state.currentOperand) {
				return {
					...state,
					operation: action.payload.operation,
				};
			}
			if (!state.previousOperand) {
				return {
					...state,
					operation: action.payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				};
			}
			return {
				...state,
				previousOperand: evaluate(state),
				operation: action.payload.operation,
				currentOperand: null,
			};

		case ACTIONS.CLEAR:
			return initialState;

		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				};
			}
			if (!state.currentOperand) return state;
			if (state.currentOperand.length === 1) {
				return {
					...state,
					currentOperand: null,
				};
			}
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};

		case ACTIONS.EVALUATE:
			if (!state.operation || !state.currentOperand || !state.previousOperand)
				return state;
			return {
				...state,
				overwrite: true,
				currentOperand: evaluate(state),
				previousOperand: null,
				operation: null,
			};

		default:
			return state;
	}
}

const CalculatorContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

export function useCalculator() {
	return useContext(CalculatorContext);
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<CalculatorContext.Provider value={{ state, dispatch }}>
			{children}
		</CalculatorContext.Provider>
	);
}
