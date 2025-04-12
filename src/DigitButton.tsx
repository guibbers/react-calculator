import { ACTIONS } from "./App";

type Action = {
	type: string;
	payload?: {
		digit?: string;
	};
};

// Tipagem das props
interface DigitButtonProps {
	dispatch: React.Dispatch<Action>;
	digit: string;
}

export default function DigitButton({ dispatch, digit }: DigitButtonProps) {
	return (
		<button
			type="button"
			onClick={() => {
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
			}}
		>
			{digit}
		</button>
	);
}
