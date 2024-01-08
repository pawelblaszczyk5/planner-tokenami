/* eslint-disable fp/no-class, fp/no-this -- stop */
import type { CalendarDate } from "@internationalized/date";
import type { Except } from "type-fest";

import Dexie, { liveQuery } from "dexie";
import { useCallback, useEffect, useState } from "react";

import { getBeginningOfDay, getEndOfDay } from "#/utils/date";
import { generateId } from "#/utils/id";

class PlannerDatabase extends Dexie {
	events!: Dexie.Table<
		{
			description: string;
			endDate: string;
			id: string;
			name: string;
			startDate: string;
		},
		string
	>;

	constructor() {
		super("PlannerDatabase");
		this.version(1).stores({
			events: "&id, name, startDate, endDate",
		});
	}
}

export type EventEntry = PlannerDatabase["events"] extends Dexie.Table<infer T> ? T : never;

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
			.sortBy("startDate");

		if (eventsForDate.length >= MIN_EVENTS_COUNT) return { eventsForDate, eventsFromFuture: [] };

		const eventsFromFuture = await db.events
			.where("startDate")
			.aboveOrEqual(endDate.toString())
			.limit(MIN_EVENTS_COUNT - eventsForDate.length)
			.sortBy("startDate");

		return { eventsForDate, eventsFromFuture };
	}, [date]);

	return useSubscribe(eventQuery);
};

export const addEvent = async (event: Except<EventEntry, "id">) => {
	await db.events.add({
		id: generateId(),
		...event,
	});
};

export const editEvent = async (event: EventEntry) => {
	await db.events.put(event);
};

export const deleteEvent = async (id: EventEntry["id"]) => {
	await db.events.delete(id);
};

export const restoreEvent = async (event: EventEntry) => {
	await db.events.put(event);
};

export const insertBulkEvents = async (events: Array<EventEntry>) => {
	await db.events.bulkAdd(events);
};
