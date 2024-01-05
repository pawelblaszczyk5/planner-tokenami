import { I18nProvider, RouterProvider } from "react-aria-components";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import FluentEmojiCalendar from "virtual:icons/fluent-emoji/calendar";
import TablerCalendarPlus from "virtual:icons/tabler/calendar-plus";

import { Button } from "#/components/button";

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
					<Outlet />
					<ScrollRestoration />
					<footer style={{ "--mt": "var(---, auto)" }}>Footer content</footer>
				</I18nProvider>
			</RouterProvider>
		</div>
	);
};

Component.displayName = "RootView";
