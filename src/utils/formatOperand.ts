const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 0,
});

export function formatOperand(operand: string | null): string | null {
	if (operand == null) return null;
	const [integer, decimal] = operand.split(".");
	if (decimal == null) return INTEGER_FORMATTER.format(Number(integer));
	return `${INTEGER_FORMATTER.format(Number(integer))}.${decimal}`;
}
