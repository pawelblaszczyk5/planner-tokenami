import { Button } from "react-aria-components";

import { decrementCount, incrementCount, useCount } from "#/lib/data";

export const Component = () => {
	const count = useCount();

	return (
		<>
			<Button onPress={decrementCount}>Decrement</Button>
			<h1>{count}</h1>
			<Button onPress={incrementCount}>Increment</Button>
		</>
	);
};

Component.displayName = "CalendarView";
