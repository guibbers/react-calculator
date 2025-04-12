import { ACTIONS, type Action } from "./App";

interface OperationButtonProps {
	dispatch: React.Dispatch<Action>;
	operation: string;
}

export default function OperationButton({
	dispatch,
	operation,
}: OperationButtonProps) {
	return (
		<button
			type="button"
			onClick={() => {
				dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
			}}
		>
			{operation}
		</button>
	);
}
