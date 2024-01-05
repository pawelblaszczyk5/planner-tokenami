import { getLocalTimeZone, now, parseDate, today } from "@internationalized/date";

export const parseDateParts = (year: string | undefined, month: string | undefined, day: string | undefined) => {
	try {
		return parseDate(`${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`);
	} catch {
		return null;
	}
};

export const getCurrentCalendarDate = () => today(getLocalTimeZone());

export const getCurrentZonedDateTime = () => now(getLocalTimeZone());
