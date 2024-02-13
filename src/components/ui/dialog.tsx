import type { ComponentPropsWithoutRef } from "react";

import { Dialog as RacDialog, Modal as RacModal, ModalOverlay as RacModalOverlay } from "react-aria-components";

import { css } from "#/utils/css";

export const Modal = ({ style, ...props }: ComponentPropsWithoutRef<typeof RacModal>) => (
	<RacModal
		style={values => {
			const overrides = typeof style === "function" ? style(values) : style;

			return css(
				{
					"--display": "grid",
					"--left": "var(---, 50%)",
					"--place-items": "center",
					"--position": "fixed",
					"--px": "var(--scale_4)",
					"--top": "var(--scale_16)",
					"--transform": "translateX(-50%)",
					"--w": "var(--size_full)",
					"--xs_px": "var(--scale_8)",
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

			return css(
				{
					"--bg-color": "var(--color_black-a10)",
					"--inset": "var(--scale_0)",
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
		style={css(
			{
				"--bg-color": "var(--color_sand-2)",
				"--border-radius": "var(--radii_md)",
				"--max-w": "var(---, 37.5rem)",
				"--p": "var(--scale_6)",
				"--w": "var(--size_full)",
			},
			style,
		)}
		{...props}
	/>
);

export { DialogTrigger } from "react-aria-components";
