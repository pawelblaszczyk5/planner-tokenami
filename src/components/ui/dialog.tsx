import type { ComponentPropsWithoutRef } from "react";

import { Dialog as RacDialog, Modal as RacModal, ModalOverlay as RacModalOverlay } from "react-aria-components";

import { mergeCss } from "#/utils/css";

export const Modal = ({ style, ...props }: ComponentPropsWithoutRef<typeof RacModal>) => (
	<RacModal
		style={values => {
			const overrides = typeof style === "function" ? style(values) : style;

			return mergeCss(
				{
					"--display": "grid",
					"--left": "var(---, 50%)",
					"--place-items": "center",
					"--position": "absolute",
					"--px": 4,
					"--top": 16,
					"--transform": "translateX(-50%)",
					"--width": "var(---, 100%)",
					"--xs_px": 8,
				},
				overrides,
			);
		}}
		{...props}
	/>
);

export const ModalOverlay = ({
	isDismissable = true,
	style,
	...props
}: ComponentPropsWithoutRef<typeof RacModalOverlay>) => (
	<RacModalOverlay
		style={values => {
			const overrides = typeof style === "function" ? style(values) : style;

			return mergeCss(
				{
					"--background-color": "var(--color_black-a10)",
					"--inset": 0,
					"--position": "absolute",
					"--z-index": "var(--z_10)",
				},
				overrides,
			);
		}}
		isDismissable={isDismissable}
		{...props}
	/>
);

export const Dialog = ({ style, ...props }: ComponentPropsWithoutRef<typeof RacDialog>) => (
	<RacDialog
		style={mergeCss(
			{
				"--background-color": "var(--color_sand-2)",
				"--border-radius": "var(--radii_md)",
				"--max-width": 150,
				"--p": 6,
				"--width": "var(---, 100%)",
			},
			style,
		)}
		{...props}
	/>
);

export { DialogTrigger } from "react-aria-components";
