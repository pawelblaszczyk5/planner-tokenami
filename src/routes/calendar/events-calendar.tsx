import type { CalendarDate } from "@internationalized/date";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDateFormatter } from "react-aria";
import {
	CalendarCell,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	Heading,
	Calendar as RacCalendar,
} from "react-aria-components";
import { useNavigate, useParams } from "react-router-dom";
import TablerArrowBigLeft from "virtual:icons/tabler/arrow-big-left";
import TablerArrowBigRight from "virtual:icons/tabler/arrow-big-right";

import { Button } from "#/components/ui/button";
import { useEventsCountForDate, useEventsForDate } from "#/lib/data";
import { convertCalendarDateToDate, getCurrentCalendarDate, parseDateParts } from "#/utils/date";

const HeaderRow = () => (
	<CalendarGridHeader style={{ "--min-height": 8 }}>
		{day => (
			<CalendarHeaderCell
				style={{
					"--width": "var(---, calc(100% / 7))",
				}}
			>
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

const DayCell = ({ date }: { date: CalendarDate }) => {
	const eventsForDate = useEventsCountForDate(date) ?? 0;

	return (
		<CalendarCell
			style={{
				"--border-radius": "var(--radii_md)",
				"--display": "flex",
				"--flex-direction": "column",
				"--m": 0.75,
				"--min-height": 16,
				"--p": 2,
				"--position": "relative",
				"--rac-focus-visible_outline-color": "var(--color_blue-8)",
				"--rac-focus-visible_outline-offset": 0.25,
				"--rac-focus-visible_outline-style": "var(--line-style_solid)",
				"--rac-focus-visible_outline-width": 0.5,
				"--rac-hover_background-color": "var(--color_sand-4)",
				"--rac-outside-month_color": "var(--color_sand-10)",
				"--rac-selected_background-color": "var(--color_orange-5)",
				"--transition-duration": "var(--transition-duration_150)",
				"--transition-property": "background-color",
				"--transition-timing-function": "var(--transition-timing-function_ease-in-out)",
				"--xs_m": 1.5,
				"--xs_p": 2.5,
				"--xs_rac-focus-visible_outline-offset": 0.75,
				...(date.toDate("utc").getDay() % 6 === 0 && {
					"--background-color": "var(--color_sand-2)",
				}),
			}}
			date={date}
		>
			{({ formattedDate }) => (
				<>
					<span
						style={{
							"--font-size": "var(--font-size_sm)",
							"--text-align": "right",
							"--xs_font-size": "var(--font-size_lg)",
						}}
					>
						{formattedDate}
					</span>
					{eventsForDate > 0 && (
						<div
							style={{
								"--align-items": "center",
								"--display": "flex",
								"--mt": "var(---, auto)",
							}}
						>
							{/* TODO: Indicate somehow that ther're more events */}
							{Array.from({ length: Math.min(eventsForDate, 4) }).map((_, index) => (
								<span
									style={{
										"--background-color": "var(--color_orange-9)",
										"--border-radius": "var(--radii_full)",
										"--height": 2,
										"--mr": -0.75,
										"--width": 2,
									}}
									key={index}
								/>
							))}
						</div>
					)}
				</>
			)}
		</CalendarCell>
	);
};

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

const Calendar = ({ date, onDateChange }: { date: CalendarDate; onDateChange: (date: CalendarDate) => void }) => {
	const [focusedDate, setFocusedDate] = useState(date);

	// TODO: Maybe this one could be solved in a better way
	useEffect(() => {
		setFocusedDate(date);
	}, [date]);

	return (
		<RacCalendar
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 4,
				"--width": "var(---, 100%)",
			}}
			aria-label="Events"
			defaultFocusedValue={date}
			focusedValue={focusedDate}
			onChange={onDateChange}
			onFocusChange={setFocusedDate}
			value={date}
		>
			<Header />
			<CalendarGrid
				style={{
					"--table-layout": "fixed",
				}}
				weekdayStyle="short"
			>
				<HeaderRow />
				<CalendarGridBody>{date => <DayCell date={date} />}</CalendarGridBody>
			</CalendarGrid>
		</RacCalendar>
	);
};

const List = ({ date }: { date: CalendarDate }) => {
	const formatter = useDateFormatter();

	const { eventsForDate, eventsFromFuture } = useEventsForDate(date) ?? { eventsForDate: [], eventsFromFuture: [] };

	return (
		<div
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 4,
				"--width": "var(---, 100%)",
			}}
		>
			<h3>Events from {formatter.format(convertCalendarDateToDate(date))}</h3>
			<ul>
				{eventsForDate.map(event => (
					<li key={event.id}>
						{event.name} {event.description} {event.startDate} {event.endDate}
					</li>
				))}
			</ul>
			<h3>Other close events</h3>
			<ul>
				{eventsFromFuture.map(event => (
					<li key={event.id}>
						{event.name} {event.description} {event.startDate} {event.endDate}
					</li>
				))}
			</ul>
		</div>
	);
};

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
		<div
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 8,
			}}
		>
			<Calendar date={date} onDateChange={navigateToDate} />
			<List date={date} />
		</div>
	);
};
