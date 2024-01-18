import { I18nProvider, RouterProvider } from "react-aria-components";
import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import TablerCalendarPlus from "virtual:icons/tabler/calendar-plus";

import { EventForm } from "#/components/event-form";
import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "#/components/ui/dialog";
import { ToastRegion } from "#/components/ui/toast";
import { Logo } from "#/routes/logo";
import { css } from "#/utils/css";

const link = css({
	"--border-radius": "var(--radii_sm)",
	"--focus-visible_outline-style": "var(--line-style_solid)",
	"--outline-color": "var(--color_blue-8)",
	"--outline-offset": "var(--scale_0-5)",
	"--outline-width": "var(--scale_0-5)",
	"--text-decoration": "underline",
});

export const Component = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				"--display": "flex",
				"--flex-dir": "column",
				"--gap": "var(--scale_8)",
				"--max-w": "var(---, 90rem)",
				"--min-h": "var(---, 100dvh)",
				"--mx": "var(---, auto)",
				"--p": "var(--scale_2)",
				"--py": "var(--scale_3)",
				"--xs_p": "var(--scale_4)",
			}}
		>
			<RouterProvider navigate={navigate}>
				<I18nProvider locale="en-US">
					<ToastRegion />
					<header
						style={{
							"--align-items": "center",
							"--display": "flex",
							"--justify-content": "space-between",
						}}
					>
						<Logo />
						<DialogTrigger>
							<Button>
								Add new event
								<TablerCalendarPlus />
							</Button>
							<ModalOverlay>
								<Modal>
									<Dialog>{({ close }) => <EventForm event={undefined} onCancel={close} onComplete={close} />}</Dialog>
								</Modal>
							</ModalOverlay>
						</DialogTrigger>
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
						<Link style={link()} to="/">
							Home
						</Link>{" "}
						|{" "}
						<Link style={link()} to="/info">
							Info
						</Link>{" "}
						|{" "}
						<a href="https://planner-tailwind.vercel.app/" rel="noreferrer" style={link()}>
							TailwindCSS&nbsp;version
						</a>
					</footer>
				</I18nProvider>
			</RouterProvider>
		</div>
	);
};

Component.displayName = "RootView";
