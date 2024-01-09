export const Component = () => (
	<>
		<title>Planner - Info</title>
		<div style={{ "--display": "flex", "--flex-dir": "column", "--gap": 4 }}>
			<h1 style={{ "--font-size": "var(--font-size_3xl)", "--font-weight": "var(--weight_semibold)" }}>Info</h1>
			<p>
				This project is a small app that I&apos;ve used to play with Tokenami. I wanted to experiment with this
				interesting library to get to know it better so I can compare it against other styling solutions that I used.
				Moreover, I also wanted to use it to benchmark Tokenami selectors performance, because it uses substring
				attribute selectors, which are known for worse performance than e.g. class selectors.
			</p>
			<p>
				More details you can read in this repository:{" "}
				<a
					style={{
						"--border-radius": "var(--radii_sm)",
						"--focus-visible_outline-style": "var(--line-style_solid)",
						"--outline-color": "var(--color_blue-8)",
						"--outline-offset": 0.75,
						"--outline-width": 0.5,
						"--text-decoration": "underline",
					}}
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
