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
					"--position": "fixed",
					"--px": 4,
					"--top": 16,
					"--transform": "translateX(-50%)",
					"--w": "var(--size_full)",
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
					"--bg-color": "var(--color_black-a10)",
					"--inset": 0,
					"--position": "fixed",
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
				"--bg-color": "var(--color_sand-2)",
				"--border-radius": "var(--radii_md)",
				"--max-w": 150,
				"--p": 6,
				"--w": "var(--size_full)",
			},
			style,
		)}
		{...props}
	/>
);

export { DialogTrigger } from "react-aria-components";
