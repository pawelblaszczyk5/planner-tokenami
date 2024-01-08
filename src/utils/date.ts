import type { CalendarDate } from "@internationalized/date";

import {
	Time,
	getLocalTimeZone,
	now,
	parseAbsoluteToLocal,
	parseDate,
	parseZonedDateTime,
	toCalendarDateTime,
	today,
} from "@internationalized/date";

export const parseDateParts = (year: string | undefined, month: string | undefined, day: string | undefined) => {
	try {
		return parseDate(`${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`);
	} catch {
		return null;
	}
};

export const getCurrentCalendarDate = () => today(getLocalTimeZone());

export const getCurrentZonedDateTime = () => now(getLocalTimeZone());

export const getBeginningOfDay = (date: CalendarDate) => toCalendarDateTime(date, new Time(0, 0, 0));

export const getEndOfDay = (date: CalendarDate) => toCalendarDateTime(date, new Time(23, 59, 59));

export const convertCalendarDateToDate = (date: CalendarDate) => date.toDate(getLocalTimeZone());

export const convertIsoStringToZonedDateTime = (date: string) => parseAbsoluteToLocal(date);

export const convertDateFromForm = (date: string) =>
	parseZonedDateTime(date).set({ millisecond: 0, second: 0 }).toAbsoluteString();
