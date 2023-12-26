import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "#/app";
import { invariant } from "#/utils/invariant";

import "@fontsource-variable/inter";
import "#/main.css";
import "#/tokenami.css";

const rootElement = document.querySelector("#root");

invariant(rootElement);

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
