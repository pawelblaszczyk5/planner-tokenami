/* eslint-disable fp/no-class, fp/no-this -- stop */
import type { CalendarDate } from "@internationalized/date";
import type { Except } from "type-fest";

import Dexie, { liveQuery } from "dexie";
import { useCallback, useEffect, useState } from "react";

import { getBeginningOfDay, getEndOfDay } from "#/utils/date";
import { generateId } from "#/utils/id";

export type Event = {
	description: string;
	endDate: string;
	id: string;
	name: string;
	startDate: string;
};

class PlannerDatabase extends Dexie {
	events!: Dexie.Table<Event, string>;

	constructor() {
		super("PlannerDatabase");
		this.version(1).stores({
			events: "&id, name, startDate, endDate",
		});
	}
}

const db = new PlannerDatabase();

const useSubscribe = <T>(query: () => Promise<T>) => {
	const [state, setState] = useState<T>();

	useEffect(() => {
		const subscription = liveQuery(query).subscribe(setState);

		return subscription.unsubscribe.bind(subscription);
	}, [setState, query]);

	return state;
};

export const useEvents = () => {
	const eventQuery = useCallback(async () => db.events.toArray(), []);

	return useSubscribe(eventQuery);
};

export const useEventsCountForDate = (date: CalendarDate) => {
	const eventQuery = useCallback(async () => {
		const startDate = getBeginningOfDay(date);
		const endDate = getEndOfDay(date);

		return db.events
			.where("startDate")
			.belowOrEqual(endDate.toString())
			.and(event => event.endDate >= startDate.toString())
			.count();
	}, [date]);

	return useSubscribe(eventQuery);
};

const MIN_EVENTS_COUNT = 5;

export const useEventsForDate = (date: CalendarDate) => {
	const eventQuery = useCallback(async () => {
		const startDate = getBeginningOfDay(date);
		const endDate = getEndOfDay(date);

		const eventsForDate = await db.events
			.where("startDate")
			.belowOrEqual(endDate.toString())
			.and(event => event.endDate >= startDate.toString())
			.toArray();

		if (eventsForDate.length >= MIN_EVENTS_COUNT) return { eventsForDate, eventsFromFuture: [] };

		const eventsFromFuture = await db.events
			.where("startDate")
			.aboveOrEqual(endDate.toString())
			.limit(MIN_EVENTS_COUNT - eventsForDate.length)
			.toArray();

		return { eventsForDate, eventsFromFuture };
	}, [date]);

	return useSubscribe(eventQuery);
};

export const addEvent = async (event: Except<Event, "id">) => {
	await db.events.add({
		id: generateId(),
		...event,
	});
};
