/* eslint-disable fp/no-class, fp/no-this -- stop */
import { parseAbsoluteToLocal } from "@internationalized/date";
import Dexie, { liveQuery } from "dexie";
import { useCallback, useEffect, useState } from "react";

import { generateId } from "#/utils/id";

type Event = {
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
			events: "&id,name,datetime",
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

export const addEvent = async (name: string) => {
	const eventDate = parseAbsoluteToLocal(new Date().toISOString());

	const startDate = eventDate.toAbsoluteString();
	const endDate = eventDate.add({ hours: 2 }).toAbsoluteString();

	await db.events.add({
		endDate,
		id: generateId(),
		name,
		startDate,
	});
};

if (import.meta.hot)
	import.meta.hot.accept(() => {
		db.close();
	});
