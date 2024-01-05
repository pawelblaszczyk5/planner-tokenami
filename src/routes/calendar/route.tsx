import { EventsCalendar } from "#/routes/calendar/events-calendar";

export const Component = () => (
	<>
		<title>Planner - Calendar</title>
		<main>
			<EventsCalendar />
		</main>
	</>
);

Component.displayName = "CalendarView";
