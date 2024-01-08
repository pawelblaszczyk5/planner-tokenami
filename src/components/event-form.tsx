import type { ZonedDateTime } from "@internationalized/date";
import type { TokenamiProperties } from "@tokenami/dev";
import type { ReactNode } from "react";

import { useRef } from "react";
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
import { addEvent } from "#/lib/data";
import { mergeCss } from "#/utils/css";
import {
	convertAbsoluteStringToIsoString,
	convertIsoStringToZonedDateTime,
	getCurrentZonedDateTime,
} from "#/utils/date";
import { invariant } from "#/utils/invariant";

const fieldCss = {
	"--display": "flex",
	"--flex-direction": "column",
	"--gap": 1.5,
} satisfies TokenamiProperties;

const inputCss = {
	"--background-color": "var(--color_sand-1)",
	"--border-color": "var(--color_orange-7)",
	"--border-radius": "var(--radii_base)",
	"--border-style": "var(--line-style_solid)",
	"--border-width": 0.25,
	"--font-size": "var(--font-size_sm)",
	"--px": 2.5,
	"--py": 2,
	"--rac-invalid_border-color": "var(--color_red-7)",
} satisfies TokenamiProperties;

const Label = ({ children }: { children: ReactNode }) => (
	<RacLabel
		style={{
			"--font-size": "var(--font-size_sm)",
			"--font-weight": "var(--weight_medium)",
		}}
	>
		{children}
	</RacLabel>
);

const FieldError = () => (
	<RacFieldError
		style={{
			"--color": "var(--color_red-11)",
			"--font-size": "var(--font-size_sm)",
		}}
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

		const convertedStartDate = convertAbsoluteStringToIsoString(startDate);
		const convertedEndDate = convertAbsoluteStringToIsoString(endDate);

		await addEvent({
			description,
			endDate: convertedEndDate,
			name,
			startDate: convertedStartDate,
		});

		const dateToNavigate = convertIsoStringToZonedDateTime(convertedStartDate);

		navigate(`/${dateToNavigate.year}/${dateToNavigate.month}/${dateToNavigate.day}`);

		onComplete();
	};

	return (
		<Form
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 8,
				"--width": "var(---, 100%)",
			}}
			action={handleSubmission}
			autoComplete="off"
			ref={form}
		>
			<Heading
				slot="title"
				style={{ "--font-size": "var(--font-size_2xl)", "--font-weight": "var(--weight_semibold)" }}
			>
				{event ? "Edit event" : "Add new event"}
			</Heading>
			<div
				style={{
					"--display": "flex",
					"--flex-direction": "column",
					"--gap": 6,
				}}
			>
				<TextField
					validate={value => {
						if (value.length === 0) return "This value is required";
						if (value.length < 3) return "This value should have at least 3 characters";
						if (value.length > 50) return "This value should have at most 50 characters";

						return null;
					}}
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

						invariant(formElement);

						const endDateElement = formElement.elements.namedItem("endDate");

						invariant(endDateElement instanceof HTMLInputElement);

						if (endDateElement.value && endDateElement.value <= value.toString())
							return 'This value should be before the "End date" field value';

						return null;
					}}
					granularity="minute"
					name="startDate"
					placeholderValue={getCurrentZonedDateTime()}
					style={fieldCss}
					hideTimeZone
					isRequired
				>
					<Label>Start date</Label>
					<DateInput
						style={mergeCss(inputCss, {
							"--display": "flex",
						})}
					>
						{segment => (
							<DateSegment
								style={{
									"--rac-placeholder_color": "var(--color_sand-11)",
								}}
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

						invariant(formElement);

						const startDateElement = formElement.elements.namedItem("startDate");

						invariant(startDateElement instanceof HTMLInputElement);

						if (startDateElement.value && startDateElement.value >= value.toString())
							return 'This value should be after the "Start date" field value';

						return null;
					}}
					granularity="minute"
					name="endDate"
					placeholderValue={getCurrentZonedDateTime()}
					style={fieldCss}
					hideTimeZone
					isRequired
				>
					<Label>End date</Label>
					<DateInput
						style={mergeCss(inputCss, {
							"--display": "flex",
						})}
					>
						{segment => (
							<DateSegment
								style={{
									"--rac-placeholder_color": "var(--color_sand-11)",
								}}
								segment={segment}
							/>
						)}
					</DateInput>
					<FieldError />
				</DateField>
			</div>
			<div style={{ "--align-items": "center", "--display": "flex", "--gap": 6, "--justify-content": "flex-end" }}>
				<Button onPress={onCancel} variant="muted">
					Cancel
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</Form>
	);
};
