import { useRef } from "react";
import { Button } from "react-aria-components";
import FluentEmojiCalendar from "virtual:icons/fluent-emoji/calendar";

const PRESS_COUNT_TO_GENERATE_MOCK_DATA = 3;
const TIMEOUT_TO_RESET = 1_000;

export const Logo = () => {
	const pressCount = useRef(0);
	const timeoutRef = useRef<number | undefined>();

	const generateMockData = () => {};

	const handlePress = () => {
		if (pressCount.current === PRESS_COUNT_TO_GENERATE_MOCK_DATA - 1) {
			generateMockData();

			return;
		}

		pressCount.current += 1;

		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			timeoutRef.current = 0;
		}, TIMEOUT_TO_RESET);
	};

	return (
		<Button aria-label="Generate mock data" onPress={handlePress}>
			<FluentEmojiCalendar
				style={{
					"--font-size": "var(--font-size_4xl)",
				}}
			/>
		</Button>
	);
};
