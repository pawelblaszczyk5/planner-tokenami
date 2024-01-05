import type { CalendarDate } from "@internationalized/date";

import { useLayoutEffect, useMemo } from "react";
import {
	Calendar,
	CalendarCell,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	Heading,
} from "react-aria-components";
import { useNavigate, useParams } from "react-router-dom";
import TablerArrowBigLeft from "virtual:icons/tabler/arrow-big-left";
import TablerArrowBigRight from "virtual:icons/tabler/arrow-big-right";

import { Button } from "#/components/button";
import { getCurrentCalendarDate, parseDateParts } from "#/utils/date";

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
	<header style={{ "--align-items": "center", "--display": "flex", "--justify-content": "space-between" }}>
		<Button slot="previous" variant="muted">
			<TablerArrowBigLeft />
		</Button>
		<Heading
			style={{
				"--color": "var(--color_orange-12)",
				"--font-size": "var(--font-size_xl)",
				"--font-weight": "var(--weight_semibold)",
			}}
		/>
		<Button slot="next" variant="muted">
			<TablerArrowBigRight />
		</Button>
	</header>
);

const useParsedDate = () => {
	const { day, month, year } = useParams();

	const parsedDate = useMemo(() => parseDateParts(year, month, day), [day, month, year]);

	return parsedDate;
};

const useCalendarDate = () => {
	const navigate = useNavigate();
	const parsedDate = useParsedDate();

	const currentDate = getCurrentCalendarDate();

	// Using useLayoutEffect instead of using navigate during rendering because we shouldn't update parent state in render
	useLayoutEffect(() => {
		if (!parsedDate) navigate(`/${currentDate.year}/${currentDate.month}/${currentDate.day}`);
	}, [parsedDate, navigate, currentDate]);

	return parsedDate ?? currentDate;
};

export const EventsCalendar = () => {
	const navigate = useNavigate();
	const date = useCalendarDate();

	const navigateToDate = (date: CalendarDate) => {
		navigate(`/${date.year}/${date.month}/${date.day}`);
	};

	return (
		<Calendar
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 4,
				"--width": "var(---, 100%)",
			}}
			aria-label="Events"
			onChange={navigateToDate}
			value={date}
		>
			<Header />
			<CalendarGrid weekdayStyle="short">
				<HeaderRow />
				<CalendarGridBody>{date => <DayCell date={date} />}</CalendarGridBody>
			</CalendarGrid>
		</Calendar>
	);
};
