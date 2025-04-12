import { formatOperand } from "../utils/formatOperand";

interface DisplayProps {
	previousOperand: string | null;
	currentOperand: string | null;
	operation: string | null;
}

export default function Display({
	previousOperand,
	currentOperand,
	operation,
}: DisplayProps) {
	return (
		<div className="output">
			<div className="previous-operand">
				{formatOperand(previousOperand)} {operation}
			</div>
			<div className="current-operand">{formatOperand(currentOperand)}</div>
		</div>
	);
}
