import { I18nProvider, RouterProvider } from "react-aria-components";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";

export const Component = () => {
	const navigate = useNavigate();

	return (
		<RouterProvider navigate={navigate}>
			<I18nProvider>
				<Outlet />
				<ScrollRestoration />
			</I18nProvider>
			<title>Planner</title>
		</RouterProvider>
	);
};

Component.displayName = "RootView";
