import { css } from "#/utils/css";

const smallComponent = css.compose(
	{
		"--bg-color": "var(--color_black-a1)",
		"--border-style": "var(--line-style_solid)",
		"--border-width": "var(--scale_1)",
		"--color": "var(--color_white-a1)",
		"--height": "var(--size_full)",
		"--px": "var(--scale_2)",
		"--py": "var(--scale_4)",
		"--width": "var(--size_full)",
		"--xs_px": "var(--scale_4)",
		"--xs_py": "var(--scale_6)",
	},
	{
		color: {
			black: {
				"--border-color": "var(--color_black-a2)",
			},
			white: {
				"--border-color": "var(--color_white-a2)",
			},
		},
		size: {
			big: {
				"--min-height": "var(--scale_32)",
				"--min-width":"var(--scale_32)",
			},
			small: {
				"--min-height": "var(--scale_32)",
				"--min-width": "var(--scale_32)",
			},
		},
	},
);

const timeBeforeSmallComponent = performance.now();

smallComponent(
	{ color: "black", size: "big" },
	{ "--px": 2, "--py": 2 },
	{ "--background-color": "var(--color_red-11)" },
);
smallComponent(
	{ color: "black", size: "small" },
	{ "--px": 2, "--py": 2 },
	{ "--background-color": "var(--color_red-11)" },
);
smallComponent(
	{ color: "white", size: "big" },
	{ "--px": 2, "--py": 2 },
	{ "--background-color": "var(--color_red-11)" },
);
smallComponent(
	{ color: "white", size: "small" },
	{ "--px": 2, "--py": 2 },
	{ "--background-color": "var(--color_red-11)" },
);

const timeAfterSmallComponent = performance.now();

console.log("Small component all variants with overrides", timeAfterSmallComponent - timeBeforeSmallComponent);

const mediumComponent = css.compose(
	{
		"--bg-color": "var(--color_blue-10)",
		"--border-color": "var(--color_red-8)",
		"--border-radius": "var(--radii_full)",
		"--border-style": "var(--line-style_solid)",
		"--border-width": "var(--scale_0-5)",
		"--bottom": "var(--scale_0)",
		"--color": "var(--color_red-8)",
		"--h": "var(--size_full)",
		"--hover_border-color": "var(--color_red-2)",
		"--left": "var(--scale_0)",
		"--position": "absolute",
		"--right": "var(--scale_0)",
		"--top": "var(--scale_0)",
		"--w": "var(--size_full)",
		"--xs_bottom": "var(--scale_2)",
		"--xs_left": "var(--scale_2)",
		"--xs_right": "var(--scale_2)",
		"--xs_top": "var(--scale_2)",
	},
	{
		color: {
			black: {
				"--color": "var(--color_black)",
				"--line-height": "var(---, 8px)",
			},
			blue: {
				"--color": "var(--color_red-8)",
				"--line-height": "var(---, 6px)",
			},
			red: {
				"--color": "var(--color_red-2)",
				"--line-height": "var(---, 4px)",
			},
			white: {
				"--color": "var(--color_white)",
				"--line-height": "var(---, 3px)",
			},
		},
		intent: {
			primary: {
				"--bg-color": "var(--color_blue-2)",
				"--border-color": "var(--color_red-3)",
			},
			secondary: {
				"--bg-color": "var(--color_blue-4)",
				"--border-color": "var(--color_red-2)",
			},
			tertiary: {
				"--bg-color": "var(--color_blue-8)",
				"--border-color": "var(--color_red-1)",
			},
		},
		size: {
			big: {
				"--inset": "var(--scale_8)",
				"--min-h": "var(--scale_32)",
				"--min-w": "var(--scale_32)",
				"--xs_inset": "var(--scale_4)",
				"--xs_min-h": "var(--scale_48)",
				"--xs_min-w": "var(--scale_48)",
			},
			medium: {
				"--inset": "var(--scale_4)",
				"--min-h": "var(--scale_24)",
				"--min-w": "var(--scale_24)",
				"--xs_inset": "var(--scale_2)",
				"--xs_min-h": "var(--scale_32)",
				"--xs_min-w": "var(--scale_32)",
			},
			small: {
				"--inset": "var(--scale_2)",
				"--min-h": "var(--scale_16)",
				"--min-w": "var(--scale_16)",
				"--xs_inset": "var(--scale_2)",
				"--xs_min-h": "var(--scale_24)",
				"--xs_min-w": "var(--scale_24)",
			},
		},
	},
);

const timeBeforeMediumComponent = performance.now();

mediumComponent(
	{
		color: "black",
		intent: "primary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "primary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "primary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "secondary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "secondary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "secondary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "tertiary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "tertiary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "black",
		intent: "tertiary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);

mediumComponent(
	{
		color: "blue",
		intent: "primary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "primary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "primary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "secondary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "secondary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "secondary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "tertiary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "tertiary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "blue",
		intent: "tertiary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);

mediumComponent(
	{
		color: "red",
		intent: "primary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "primary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "primary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "secondary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "secondary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "secondary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "tertiary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "tertiary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "red",
		intent: "tertiary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);

mediumComponent(
	{
		color: "white",
		intent: "primary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "primary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "primary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "secondary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "secondary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "secondary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "tertiary",
		size: "big",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "tertiary",
		size: "medium",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);
mediumComponent(
	{
		color: "white",
		intent: "tertiary",
		size: "small",
	},
	{
		"--hover_border-color": "var(--color_blue-2)",
		"--inset": 4,
		"--left": 2,
		"--xs_left": 4,
	},
	{
		"--min-h": 16,
	},
	{
		"--min-w": 24,
	},
	{
		"--line-height": "var(---, 2px)",
	},
	{
		"--line-height": "var(---, 8px)",
	},
	{
		"--border-radius": "var(--radii_base)",
	},
);

const timeAfterMediumComponent = performance.now();

console.log("Medium component all variants with overrides", timeAfterMediumComponent - timeBeforeMediumComponent);
