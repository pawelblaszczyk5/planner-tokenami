import type { ZonedDateTime } from "@internationalized/date";
import type { ReactNode } from "react";

import { useMemo, useRef } from "react";
import {
	DateField,
	DateInput,
	DateSegment,
	Form,
	Heading,
	Input,
	FieldError as RacFieldError,
	Label as RacLabel,
	TextArea,
	TextField,
} from "react-aria-components";
import { useNavigate } from "react-router-dom";

import type { EventEntry } from "#/lib/data";

import { Button } from "#/components/ui/button";
import { addEvent, editEvent } from "#/lib/data";
import { css } from "#/utils/css";
import { convertDateFromForm, convertIsoStringToZonedDateTime, getCurrentZonedDateTime } from "#/utils/date";
import { invariant } from "#/utils/invariant";

const fieldCss = css({
	"--display": "flex",
	"--flex-dir": "column",
	"--gap": "var(--scale_1-5)",
});

const inputCss = css({
	"--bg-color": "var(--color_sand-1)",
	"--border-color": "var(--color_orange-7)",
	"--border-radius": "var(--radii_base)",
	"--border-style": "var(--line-style_solid)",
	"--border-width": "var(--scale_px)",
	"--font-size": "var(--font-size_base)",
	"--outline-color": "var(--color_blue-8)",
	"--outline-offset": "var(--scale_0-5)",
	"--outline-width": "var(--scale_0-5)",
	"--px": "var(--scale_2-5)",
	"--py": "var(--scale_2)",
	"--rac-focus_outline-style": "var(--line-style_solid)",
	"--rac-invalid_border-color": "var(--color_red-7)",
});

const Label = ({ children }: { children: ReactNode }) => (
	<RacLabel
		style={css({
			"--font-size": "var(--font-size_sm)",
			"--font-weight": "var(--weight_medium)",
		})}
	>
		{children}
	</RacLabel>
);

const FieldError = () => (
	<RacFieldError
		style={css({
			"--color": "var(--color_red-11)",
			"--font-size": "var(--font-size_sm)",
		})}
	/>
);

export const EventForm = ({
	event,
	onCancel,
	onComplete,
}: {
	event: EventEntry | undefined;
	onCancel: () => void;
	onComplete: () => void;
}) => {
	const form = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();

	const defaultDates = useMemo(() => {
		if (!event) return { endDate: null, startDate: null };

		return {
			endDate: convertIsoStringToZonedDateTime(event.endDate),
			startDate: convertIsoStringToZonedDateTime(event.startDate),
		};
	}, [event]);

	const handleSubmission = async (formData: FormData) => {
		const name = formData.get("name");
		const description = formData.get("description");
		const startDate = formData.get("startDate");
		const endDate = formData.get("endDate");

		invariant(
			typeof name === "string" &&
				typeof description === "string" &&
				typeof startDate === "string" &&
				typeof endDate === "string",
			"Form should have valid values after submission",
		);

		const convertedStartDate = convertDateFromForm(startDate);
		const convertedEndDate = convertDateFromForm(endDate);

		const data = {
			description,
			endDate: convertedEndDate,
			name,
			startDate: convertedStartDate,
		};

		await (event
			? editEvent({
					id: event.id,
					...data,
				})
			: addEvent(data));

		const dateToNavigate = convertIsoStringToZonedDateTime(convertedStartDate);

		navigate(`/${dateToNavigate.year}/${dateToNavigate.month}/${dateToNavigate.day}`);

		onComplete();
	};

	return (
		<Form
			style={css({
				"--display": "flex",
				"--flex-dir": "column",
				"--gap": "var(--scale_8)",
				"--w": "var(--size_full)",
			})}
			action={handleSubmission}
			autoComplete="off"
			ref={form}
		>
			<Heading
				slot="title"
				style={css({ "--font-size": "var(--font-size_2xl)", "--font-weight": "var(--weight_semibold)" })}
			>
				{event ? "Edit event" : "Add new event"}
			</Heading>
			<div
				style={css({
					"--display": "flex",
					"--flex-dir": "column",
					"--gap": "var(--scale_6)",
				})}
			>
				<TextField
					validate={value => {
						if (value.length === 0) return "This value is required";
						if (value.length < 3) return "This value should have at least 3 characters";
						if (value.length > 50) return "This value should have at most 50 characters";

						return null;
					}}
					defaultValue={event?.name ?? ""}
					maxLength={50}
					minLength={3}
					name="name"
					style={fieldCss}
					isRequired
				>
					<Label>Name</Label>
					<Input style={inputCss} />
					<FieldError />
				</TextField>
				<TextField
					validate={value => {
						if (value.length < 3) return "This value should have at least 3 characters";
						if (value.length > 255) return "This value should have at most 255 characters";

						return null;
					}}
					defaultValue={event?.description ?? ""}
					maxLength={255}
					minLength={3}
					name="description"
					style={fieldCss}
				>
					<Label>Description</Label>
					<TextArea rows={3} style={inputCss} />
					<FieldError />
				</TextField>
				<DateField<ZonedDateTime>
					validate={(value: ZonedDateTime | null) => {
						if (!value) return "This value should be a valid date";

						const formElement = form.current;

						// This case handles default values and validation before rendered
						if (!formElement) return null;

						const endDateElement = formElement.elements.namedItem("endDate");

						invariant(endDateElement instanceof HTMLInputElement);

						if (endDateElement.value && endDateElement.value <= value.toString())
							return 'This value should be before the "End date" field value';

						return null;
					}}
					defaultValue={defaultDates.startDate}
					name="startDate"
					placeholderValue={getCurrentZonedDateTime()}
					style={fieldCss}
					hideTimeZone
					isRequired
				>
					<Label>Start date</Label>
					<DateInput
						style={css(inputCss, {
							"--display": "flex",
						})}
					>
						{segment => (
							<DateSegment
								style={css({
									"--border-radius": "var(--radii_base)",
									"--rac-focus_bg-color": "var(--color_blue-8)",
									"--rac-placeholder_color": "var(--color_sand-11)",
								})}
								segment={segment}
							/>
						)}
					</DateInput>
					<FieldError />
				</DateField>
				<DateField<ZonedDateTime>
					validate={(value: ZonedDateTime | null) => {
						if (!value) return "This value should be a valid date";

						const formElement = form.current;

						// This case handles default values and validation before rendered
						if (!formElement) return null;

						const startDateElement = formElement.elements.namedItem("startDate");

						invariant(startDateElement instanceof HTMLInputElement);

						if (startDateElement.value && startDateElement.value >= value.toString())
							return 'This value should be after the "Start date" field value';

						return null;
					}}
					defaultValue={defaultDates.endDate}
					name="endDate"
					placeholderValue={getCurrentZonedDateTime()}
					style={fieldCss}
					hideTimeZone
					isRequired
				>
					<Label>End date</Label>
					<DateInput
						style={css(inputCss, {
							"--display": "flex",
						})}
					>
						{segment => (
							<DateSegment
								style={css({
									"--border-radius": "var(--radii_base)",
									"--rac-focus_bg-color": "var(--color_blue-8)",
									"--rac-placeholder_color": "var(--color_sand-11)",
								})}
								segment={segment}
							/>
						)}
					</DateInput>
					<FieldError />
				</DateField>
			</div>
			<div
				style={css({
					"--align-items": "center",
					"--display": "flex",
					"--gap": "var(--scale_6)",
					"--justify-content": "flex-end",
				})}
			>
				<Button onPress={onCancel} variant="muted">
					Cancel
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</Form>
	);
};
