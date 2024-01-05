import type { CalendarDate } from "@internationalized/date";

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

const HeaderRow = () => (
	<CalendarGridHeader style={{ "--min-height": 8 }}>
		{day => (
			<CalendarHeaderCell>
				<span
					style={{
						"--align-items": "center",
						"--color": "var(--color_orange-12)",
						"--display": "flex",
						"--font-size": "var(--font-size_xs)",
						"--font-weight": "var(--weight_semibold)",
						"--justify-content": "flex-end",
						"--m": 0.75,
						"--min-height": 8,
						"--p": 2,
						"--xs_font-size": "var(--font-size_base)",
						"--xs_m": 1.5,
						"--xs_p": 2.5,
					}}
				>
					{day}
				</span>
			</CalendarHeaderCell>
		)}
	</CalendarGridHeader>
);

const DayCell = ({ date }: { date: CalendarDate }) => (
	<CalendarCell
		style={{
			"--border-radius": "var(--radii_md)",
			"--font-size": "var(--font-size_sm)",
			"--m": 0.75,
			"--min-height": 16,
			"--p": 2,
			"--rac-focus-visible_outline-color": "var(--color_blue-7)",
			"--rac-focus-visible_outline-offset": 0.25,
			"--rac-focus-visible_outline-style": "var(--line-style_solid)",
			"--rac-focus-visible_outline-width": 0.5,
			"--rac-hover_background-color": "var(--color_sand-4)",
			"--rac-outside-month_color": "var(--color_sand-10)",
			"--rac-selected_background-color": "var(--color_orange-5)",
			"--text-align": "right",
			"--transition-duration": "var(--transition-duration_150)",
			"--transition-property": "background-color",
			"--transition-timing-function": "var(--transition-timing-function_ease-in-out)",
			"--xs_font-size": "var(--font-size_lg)",
			"--xs_m": 1.5,
			"--xs_p": 2.5,
			"--xs_rac-focus-visible_outline-offset": 0.75,
			...(date.toDate("utc").getDay() % 6 === 0 && {
				"--background-color": "var(--color_sand-2)",
			}),
		}}
		date={date}
	/>
);

const Header = () => (
	<header style={{ "--display": "flex", "--justify-content": "space-between" }}>
		<Button slot="previous">◀</Button>
		<Heading />
		<Button slot="next">▶</Button>
	</header>
);

export const EventsCalendar = () => (
	<Calendar
		style={{
			"--display": "flex",
			"--flex-direction": "column",
			"--gap": 4,
			"--width": "var(---, 100%)",
		}}
		aria-label="Events"
	>
		<Header />
		<CalendarGrid weekdayStyle="short">
			<HeaderRow />
			<CalendarGridBody>{date => <DayCell date={date} />}</CalendarGridBody>
		</CalendarGrid>
	</Calendar>
);
