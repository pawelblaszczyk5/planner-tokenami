import {
	Button,
	Calendar,
	CalendarCell,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	Heading,
} from "react-aria-components";

import { css } from "#/lib/css";
import { useEvents } from "#/lib/data";

const calendarCell = css(
	{
		"--min-height": 16,
		"--min-width": 10,
		"--px": 4,
		"--py": 6,
		"--text-align": "right",
	},
	{
		type: {
			date: {
				"--rac-outside-month_color": "var(--color_sand-11)",
				"--rac-selected_color": "var(--color_orange-11)",
			},
			dayOfWeek: {
				"--color": "var(--color_orange-12)",
				"--font-weight": "var(--weight_semibold)",
			},
		},
	},
);

const EventsCalendar = () => (
	<Calendar
		onChange={e => {
			console.log("value", e);
		}}
		onFocusChange={e => {
			console.log("focus", e);
		}}
		aria-label="Events"
		style={{ "--display": "flex", "--flex-direction": "column", "--gap": 4 }}
	>
		<header style={{ "--display": "flex", "--justify-content": "space-between" }}>
			<Button slot="previous">◀</Button>
			<Heading />
			<Button slot="next">▶</Button>
		</header>
		<CalendarGrid
			style={{
				"--width": "var(---, 100%)",
			}}
		>
			<CalendarGridHeader style={{ "--min-height": 8 }}>
				{day => <CalendarHeaderCell style={calendarCell({ type: "dayOfWeek" })}>{day}</CalendarHeaderCell>}
			</CalendarGridHeader>
			<CalendarGridBody>{date => <CalendarCell date={date} style={calendarCell({ type: "date" })} />}</CalendarGridBody>
		</CalendarGrid>
	</Calendar>
);

export const Component = () => {
	const events = useEvents();

	if (!events) return;

	return (
		<main style={{ "--min-height": "var(---, 100dvh)" }}>
			<EventsCalendar />
			<title>Planner - Calendar</title>
		</main>
	);
};

Component.displayName = "CalendarView";
