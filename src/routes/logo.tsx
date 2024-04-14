import { useRef } from "react";
import { Button } from "react-aria-components";
import FluentEmojiCalendar from "virtual:icons/fluent-emoji/calendar";

import { insertBulkEvents } from "#/lib/data";
import { css } from "#/utils/css";

const PRESS_COUNT_TO_GENERATE_MOCK_DATA = 3;
const TIMEOUT_TO_RESET = 1_000;

export const Logo = () => {
	const pressCount = useRef(0);
	const timeoutRef = useRef<number | undefined>();

	const generateMockData = async () => {
		const { generateMockData } = await import("#/lib/mock-data");

		const data = generateMockData(50);

		await insertBulkEvents(data);
	};

	const handlePress = () => {
		if (pressCount.current === PRESS_COUNT_TO_GENERATE_MOCK_DATA - 1) {
			void generateMockData();

			return;
		}

		pressCount.current += 1;

		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			timeoutRef.current = 0;
		}, TIMEOUT_TO_RESET);
	};

	return (
		<Button
			style={css({
				"--border-radius": "var(--radii_base)",
				"--outline": "none",
				"--outline-color": "var(--color_blue-8)",
				"--outline-offset": "var(--scale_0-5)",
				"--outline-width": "var(--scale_0-5)",
				"--rac-focus-visible_outline-style": "var(--line-style_solid)",
			})}
			aria-label="Generate mock data"
			onPress={handlePress}
		>
			<FluentEmojiCalendar
				style={css({
					"--font-size": "var(--font-size_4xl)",
				})}
			/>
		</Button>
	);
};
