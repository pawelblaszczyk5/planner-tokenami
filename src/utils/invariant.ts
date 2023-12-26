const PREFIX = "Invariant failed";

// eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions -- assertion function needs to be a declaration
export function invariant(condition: any, message?: (() => string) | string): asserts condition {
	if (condition) return;

	if (import.meta.env.PROD) throw new Error(PREFIX);

	const provided: string | undefined = typeof message === "function" ? message() : message;

	const value: string = provided ? `${PREFIX}: ${provided}` : PREFIX;

	throw new Error(value);
}
