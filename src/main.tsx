import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "#/lib/router";
import { invariant } from "#/utils/invariant";

import "#/main.css";
import "#/tokenami-future.css";

const rootElement = document.querySelector("#root");

invariant(rootElement);

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider future={{ v7_startTransition: true }} router={router} />
	</StrictMode>,
);
