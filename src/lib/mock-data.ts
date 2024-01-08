import { faker } from "@faker-js/faker";

import type { EventEntry } from "#/lib/data";

import { generateId } from "#/utils/id";

export const generateMockData = (count: number) =>
	Array.from({ length: count }, () => {
		const startDate = faker.date.soon({ days: 60 });

		return {
			description: faker.word.words({
				count: {
					max: 20,
					min: 10,
				},
			}),
			endDate: faker.date.soon({ days: 5, refDate: startDate }).toISOString(),
			id: generateId(),
			name: faker.word.words({
				count: {
					max: 5,
					min: 2,
				},
			}),
			startDate: startDate.toISOString(),
		} satisfies EventEntry;
	});
