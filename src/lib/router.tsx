import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		children: [
			{
				lazy: async () => import("#/routes/info"),
				path: "info",
      },
      {
				lazy: async () => import("#/routes/calendar"),
				path: "/:year?/:month?",
			},
		],
		lazy: async () => import("#/routes/root"),
		path: "/",
	},
]);
