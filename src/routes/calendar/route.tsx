import { EventsCalendar } from "#/routes/calendar/events-calendar";

export const Component = () => (
	<main
		style={{
			"--align-items": "center",
			"--display": "flex",
			"--flex-direction": "column",
			"--min-height": "var(---, 100dvh)",
		}}
	>
		<EventsCalendar />
		<title>Planner - Calendar</title>
	</main>
);

Component.displayName = "CalendarView";
