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
		"--gap": "var(--scale_1-5)",
		"--h": "var(--scale_9)",
		"--outline-color": "var(--color_blue-8)",
		"--outline-offset": "var(--scale_0-5)",
		"--outline-width": "var(--scale_0-5)",
		"--px": "var(--scale_2-5)",
		"--py": "var(--scale_2)",
		"--rac-focus-visible_outline-style": "var(--line-style_solid)",
		"--transition-duration": "var(--transition-duration_150)",
		"--transition-property": "background-color",
		"--transition-timing-function": "var(--transition-timing-function_ease-in-out)",
	},
	{
		variant: {
			base: {
				"--bg-color": "var(--color_orange-9)",
				"--rac-hover_bg-color": "var(--color_orange-10)",
			},
			muted: {
				"--bg-color": "var(--color_orange-3)",
				"--rac-hover_bg-color": "var(--color_orange-4)",
			},
			negative: {
				"--bg-color": "var(--color_red-9)",
				"--rac-hover_bg-color": "var(--color_red-10)",
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
