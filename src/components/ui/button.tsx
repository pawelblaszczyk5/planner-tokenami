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
		"--h": 9,
		"--outline-color": "var(--color_blue-8)",
		"--outline-offset": 0.75,
		"--outline-width": 0.5,
		"--px": 2.5,
		"--py": 2,
		"--rac-focus-visible_outline-style": "var(--line-style_solid)",
		"--transition-duration": "var(--transition-duration_150)",
		"--transition-property": "background-color",
		"--transition-timing-function": "var(--transition-timing-function_ease-in-out)",
	},
	{
		variant: {
			base: {
				"--bg-color": "var(--color_orange-9)",
				"--hover_bg-color": "var(--color_orange-10)",
			},
			muted: {
				"--bg-color": "var(--color_orange-3)",
				"--hover_bg-color": "var(--color_orange-4)",
			},
			negative: {
				"--bg-color": "var(--color_red-9)",
				"--hover_bg-color": "var(--color_red-10)",
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
