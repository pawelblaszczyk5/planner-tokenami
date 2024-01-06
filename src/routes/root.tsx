import { I18nProvider, RouterProvider } from "react-aria-components";
import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import FluentEmojiCalendar from "virtual:icons/fluent-emoji/calendar";
import TablerCalendarPlus from "virtual:icons/tabler/calendar-plus";

import { Button } from "#/components/ui/button";

export const Component = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				"--display": "flex",
				"--flex-direction": "column",
				"--gap": 8,
				"--max-width": 360,
				"--min-height": "var(---, 100dvh)",
				"--mx": "var(---, auto)",
				"--p": 2,
				"--py": 3,
				"--xs_p": 4,
			}}
		>
			<RouterProvider navigate={navigate}>
				<I18nProvider locale="en-US">
					<header
						style={{
							"--align-items": "center",
							"--display": "flex",
							"--justify-content": "space-between",
						}}
					>
						<FluentEmojiCalendar
							style={{
								"--font-size": "var(--font-size_4xl)",
							}}
						/>
						<Button>
							Add new event
							<TablerCalendarPlus />
						</Button>
					</header>
					<main>
						<Outlet />
					</main>
					<ScrollRestoration />
					<footer
						style={{
							"--color": "var(--color_sand-11)",
							"--font-size": "var(--font-size_sm)",
							"--mt": "var(---, auto)",
							"--text-align": "center",
						}}
					>
						<Link style={{ "--text-decoration": "underline" }} to="/">
							Home
						</Link>{" "}
						|{" "}
						<Link style={{ "--text-decoration": "underline" }} to="/info">
							Info
						</Link>{" "}
						|{" "}
						<a href="https://example.com" rel="noreferrer" style={{ "--text-decoration": "underline" }}>
							Tailwind&nbsp;version
						</a>
					</footer>
				</I18nProvider>
			</RouterProvider>
		</div>
	);
};

Component.displayName = "RootView";
