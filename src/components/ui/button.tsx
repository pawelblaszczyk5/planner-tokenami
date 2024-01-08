import type { ComponentPropsWithoutRef } from "react";

import { Button as RacButton } from "react-aria-components";

import type { Variants } from "#/utils/css";

import { css } from "#/utils/css";

const button = css(
	{
		"--align-items": "center",
		"--border-radius": "var(--radii_base)",
		"--color": "var(--color_white)",
		"--display": "flex",
		"--font-weight": "var(--weight_semibold)",
		"--gap": 1.5,
		"--height": 9,
		"--px": 2.5,
		"--py": 2,
		"--rac-focus-visible_outline-color": "var(--color_blue-8)",
		"--rac-focus-visible_outline-offset": 0.75,
		"--rac-focus-visible_outline-style": "var(--line-style_solid)",
		"--rac-focus-visible_outline-width": 0.5,
		"--transition-duration": "var(--transition-duration_150)",
		"--transition-property": "background-color",
		"--transition-timing-function": "var(--transition-timing-function_ease-in-out)",
	},
	{
		variant: {
			base: {
				"--background-color": "var(--color_orange-9)",
				"--hover_background-color": "var(--color_orange-10)",
			},
			muted: {
				"--background-color": "var(--color_orange-3)",
				"--hover_background-color": "var(--color_orange-4)",
			},
			negative: {
				"--background-color": "var(--color_red-9)",
				"--hover_background-color": "var(--color_red-10)",
			},
		},
	},
);

export const Button = ({
	style = {},
	variant = "base",
	...props
}: ComponentPropsWithoutRef<typeof RacButton> & Variants<typeof button>) => (
	<RacButton
		style={values => {
			const overrides = typeof style === "function" ? style(values) : style;

			return button({ variant }, overrides);
		}}
		{...props}
	/>
);
