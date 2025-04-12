import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import Display from "./components/Display";
import "./styles.css";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	CHOOSE_OPERATION: "choose-operation",
	CLEAR: "clear",
	DELETE_DIGIT: "delete-digit",
	EVALUATE: "evaluate",
};

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
			if (state.currentOperand == null && state.previousOperand == null)
				return state;

			if (state.overwrite) {
				return {
					...state,
					operation: action.payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
					overwrite: false,
				};
			}

			if (state.currentOperand == null) {
				return {
					...state,
					operation: action.payload.operation,
				};
			}

			if (state.previousOperand == null) {
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

		case ACTIONS.EVALUATE:
			if (
				state.operation == null ||
				state.currentOperand == null ||
				state.previousOperand == null
			) {
				return state;
			}

			return {
				...state,
				overwrite: true,
				previousOperand: null,
				operation: null,
				currentOperand: evaluate(state),
			};

		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				};
			}
			if (state.currentOperand == null) return state;
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

		default:
			return state;
	}
}

function evaluate({ currentOperand, previousOperand, operation }: State) {
	const prev = Number.parseFloat(previousOperand || "");
	const current = Number.parseFloat(currentOperand || "");
	if (Number.isNaN(prev) || Number.isNaN(current)) return "";
	let computation = "";
	switch (operation) {
		case "+":
			computation = (prev + current).toString();
			break;
		case "-":
			computation = (prev - current).toString();
			break;
		case "*":
			computation = (prev * current).toString();
			break;
		case "÷":
			computation = (prev / current).toString();
			break;
	}
	return computation;
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 0,
});

function formatOperand(operand: string | null) {
	if (operand == null) return;
	const [integer, decimal] = operand.split(".");
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
	const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	return (
		<div className="calculator-grid">
			<Display
				previousOperand={previousOperand}
				currentOperand={currentOperand}
				operation={operation}
			/>
			<button
				type="button"
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.CLEAR })}
			>
				AC
			</button>
			<button
				type="button"
				onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
			>
				DEL
			</button>
			<OperationButton operation="÷" dispatch={dispatch} />
			<DigitButton digit="1" dispatch={dispatch} />
			<DigitButton digit="2" dispatch={dispatch} />
			<DigitButton digit="3" dispatch={dispatch} />
			<OperationButton operation="*" dispatch={dispatch} />
			<DigitButton digit="4" dispatch={dispatch} />
			<DigitButton digit="5" dispatch={dispatch} />
			<DigitButton digit="6" dispatch={dispatch} />
			<OperationButton operation="+" dispatch={dispatch} />
			<DigitButton digit="7" dispatch={dispatch} />
			<DigitButton digit="8" dispatch={dispatch} />
			<DigitButton digit="9" dispatch={dispatch} />
			<OperationButton operation="-" dispatch={dispatch} />
			<DigitButton digit="." dispatch={dispatch} />
			<DigitButton digit="0" dispatch={dispatch} />
			<button
				type="button"
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
			>
				=
			</button>
		</div>
	);
}

export default App;
