import { css } from "#/utils/css";

export const Component = () => (
	<>
		<title>Planner - Info</title>
		<div style={css({ "--display": "flex", "--flex-dir": "column", "--gap": "var(--scale_4)" })}>
			<h1 style={css({ "--font-size": "var(--font-size_3xl)", "--font-weight": "var(--weight_semibold)" })}>Info</h1>
			<p>
				This project is a small app that I&apos;ve used to play with Tokenami. I wanted to experiment with this
				interesting library to get to know it better so I can compare it against other styling solutions that I used.
				Moreover, I also wanted to use it to benchmark Tokenami selectors performance, because it uses substring
				attribute selectors, which are known for worse performance than e.g. class selectors.
			</p>
			<p>
				More details you can read in this repository:{" "}
				<a
					style={css({
						"--border-radius": "var(--radii_sm)",
						"--focus-visible_outline-style": "var(--line-style_solid)",
						"--outline": "none",
						"--outline-color": "var(--color_blue-8)",
						"--outline-offset": "var(--scale_0-5)",
						"--outline-width": "var(--scale_0-5)",
						"--text-decoration": "underline",
					})}
					href="http://github.com/pawelblaszczyk5/planner-tokenami"
					rel="noreferrer"
				>
					Planner Tokenami GitHub
				</a>
			</p>
		</div>
	</>
);

Component.displayName = "InfoView";
