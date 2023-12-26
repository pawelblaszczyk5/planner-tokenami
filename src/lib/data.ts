import type { MutatorDefs, ReadTransaction } from "replicache";

import { useCallback, useEffect, useState } from "react";
import { Replicache } from "replicache";

const replicache = new Replicache({
	licenseKey: import.meta.env.VITE_REPLICACHE_LICENSE_KEY,
	mutators: {
		decrementCount: async tx => {
			const current = (await tx.get<number>("count")) ?? 0;
			const next = current - 1;

			await tx.set("count", next);
		},
		incrementCount: async tx => {
			const current = (await tx.get<number>("count")) ?? 0;
			const next = current + 1;

			await tx.set("count", next);
		},
	} satisfies MutatorDefs,
	name: "baseUser",
});

const useSubscribe = <T>(query: (tx: ReadTransaction) => Promise<T>) => {
	const [state, setState] = useState<T>();

	useEffect(
		() =>
			replicache.subscribe(query, state => {
				setState(state);
			}),
		[setState, query],
	);

	return state;
};

export const useCount = () => {
	const countQuery = useCallback(async (tx: ReadTransaction) => {
		const currentValue = await tx.get<number>("count");

		return currentValue ?? 0;
	}, []);

	return useSubscribe(countQuery);
};

export const incrementCount = async () => replicache.mutate.incrementCount();
export const decrementCount = async () => replicache.mutate.decrementCount();

if (import.meta.hot)
	import.meta.hot.accept(() => {
		void replicache.close();
	});
