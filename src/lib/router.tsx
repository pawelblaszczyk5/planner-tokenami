import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		children: [
			{
				lazy: async () => import("#/routes/info/route"),
				path: "info",
			},
			{
				lazy: async () => import("#/routes/calendar/route"),
				path: "/:year?/:month?/:day?",
			},
		],
		lazy: async () => import("#/routes/root"),
		path: "/",
	},
]);
