import { Button, FieldError, Form, Input, Label, TextField } from "react-aria-components";

import { addEvent, useEvents } from "#/lib/data";

export const Component = () => {
	const events = useEvents();

	if (!events) return;

	return (
		<>
			<Form
				action={async data => {
					const name = data.get("name") as string;

					await addEvent(name);
				}}
				onSubmit={e => {
					e.currentTarget.reset();
				}}
			>
				<TextField minLength={3} name="name" isRequired>
					<Label>Event name</Label>
					<Input />
					<FieldError />
				</TextField>
				<Button type="submit">Add event</Button>
			</Form>
			<ul>
				{events.map(event => (
					<li key={event.id}>
						<span>{event.name}</span>
						<span>{event.datetime}</span>
					</li>
				))}
			</ul>
			<title>Planner - Calendar</title>
		</>
	);
};

Component.displayName = "CalendarView";
