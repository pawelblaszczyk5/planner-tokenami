/* eslint-disable fp/no-class, fp/no-this -- stop */
import Dexie, { liveQuery } from "dexie";
import { useCallback, useEffect, useState } from "react";

import { generateId } from "#/utils/id";

type Event = {
	datetime: string;
	id: string;
	name: string;
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
	const eventDate = new Date().toISOString();

	await db.events.add({
		datetime: eventDate,
		id: generateId(),
		name,
	});
};

if (import.meta.hot)
	import.meta.hot.accept(() => {
		db.close();
	});
